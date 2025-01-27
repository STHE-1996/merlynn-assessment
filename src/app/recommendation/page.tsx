"use client";
import React, { useEffect, useState } from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { fetchModelData, fetchModels, getRecommendation } from '@/services/apiservice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import connectToDB from '@/utils/connectToDB';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import NavBar from '../navBar/page';
// import { useNavigate } from 'react-router-dom';


  // types/index.ts (or define it directly in the component file)

export interface Model {
    id: string;
    name: string;
    description: string;
  }
  
const Recommendation = () => {
  const [modelData, setModelData] = useState<ModelResponse | null>(null); 
  const [userInput, setUserInput] = useState<any>({}); 
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails  | null>(null);  
  const [isOpen, setIsOpen] = useState(false); 
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
//   const navigate = useNavigate();
const [models, setModels] = useState<Model[]>([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const router = useRouter();
 

 
  useEffect(() => {
    const modelId = '58d3bcf97c6b1644db73ad12'; 

    fetchModelData(modelId)
      .then((data) => {
        setModelData(data); 
        console.log(data); 
        setIsOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching model data', error); 
      });
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelsData = await fetchModels();
        console.log("Fetched models:", modelsData);  
        setModels(modelsData); 
        
      } catch (err: unknown) {
        // setError((err as Error).message);  
      } finally {
        setLoading(false);
      }
    };
  
    loadModels();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const handleCardClick = async (modelId: string) => {
    try {
      const data = await fetchModelData(modelId);
      setModelData(data);  
      setIsOpen(true);
      console.log('Fetched model data:', data); 
    } catch (err: unknown) {
      
    }
  };
 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const modelId = '58d3bcf97c6b1644db73ad12';
    getRecommendation(modelId, userInput)
      .then(async (result) => {
        setRecommendation(result);
  
        console.log('the results are :', result);
        sessionStorage.setItem('recommendation', JSON.stringify(result));
        router.push('/drink-recommended')

        const response = await fetch('/api/saveRecommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        });
  
        if (!response.ok) {
          console.error('Failed to save data to MongoDB');
        }
        
  
        setIsOpen(false);
      })
      .catch((error) => {
        console.error('Error getting recommendation', error);
  
        const errorResponse = error.response?.data as ErrorResponse;
  
        if (errorResponse && errorResponse.errors) {
          const errorMessage = errorResponse.errors[0];
          setErrorDetails({
            title: errorMessage.title,
            detail: errorMessage.detail,
          });
          setErrorDialogOpen(true);
        }
      });
  };
  
  return (
    <>
        {/* Include the NavBar here */}
        <NavBar />
    <div>
         <div className="flex items-center justify-center min-h-screen">
  <div className="flex gap-6 flex-wrap justify-center">
    {Array.isArray(models) && models.length > 0 ? (
      models.map((model, index) => (
        <Card key={index} className="p-10 shadow-lg rounded-lg w-[90%] max-w-lg" onClick={() => handleCardClick(model.id)}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">{model?.name}</h2>
            <p>{model?.description}</p>
          </div>
        </Card>
      ))
    ) : (
      <p>No models available</p>
    )}
  </div>
</div>



      {/* Form Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger>

        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{modelData ? modelData.data.attributes.name : 'Loading Model...'}</AlertDialogTitle>
            <AlertDialogDescription>
              Fill out the form below to receive a drink recommendation!
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Form Inside the Dialog */}
          {modelData ? (
            <form onSubmit={handleSubmit}>
              {modelData.data.attributes.metadata.attributes.map((field: any, index: number) => {
                const fieldType = field.type;
                const values = field.domain?.values ?? [];
                switch (fieldType) {
                  case 'Nominal':
                    return (
                      <div key={index} className="mb-4">
                        <label>{field.question}</label>
                        <Select
                          name={field.name}
                          value={userInput[field.name] || ''}
                          onValueChange={(value) => handleInputChange({ target: { name: field.name, value } } as any)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {values.map((value: string, idx: number) => (
                              <SelectItem key={idx} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  case 'Continuous':
                    return (
                      <div key={index} className="mb-4">
                        <label>{field.question}</label>
                        <Input
                          type="number"
                          name={field.name}
                          value={userInput[field.name] || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          ) : (
            <p>Loading form...</p>
          )}

          {recommendation && <h2>Recommended Drink: {recommendation}</h2>}
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      {errorDetails && (
        <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
          <AlertDialogTrigger />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{errorDetails.title}</AlertDialogTitle>
              <AlertDialogDescription>{errorDetails.detail}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setErrorDialogOpen(false)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
    </>
  );
};

export default Recommendation;