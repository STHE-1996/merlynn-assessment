'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaTrash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import NavBar from '../navBar/page';

const API_BASE_URL = 'https://api.up2tom.com/v3/';
const BEARER_TOKEN = '9307bfd5fa011428ff198bb37547f979'; 
const API_URL = 'https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12/675989c40e9e101e8d7c924f';

const Batch = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [file, setFile] = useState<File | null>(null); 
  const [isUploading, setIsUploading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // Fetch data from the API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}batch/58d3bcf97c6b1644db73ad12`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        setFiles(response.data.data.files); 
      } catch (error) {
        setError('Failed to fetch data'); 
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

 
  const handleDelete = (id: string) => {
  
    
    setFiles(files.filter(file => file.id !== id));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      setError(null); 
      setSuccessMessage(null); 

      const response = await axios.post(`${API_BASE_URL}batch/58d3bcf97c6b1644db73ad12`, formData, {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('File uploaded successfully!');
      console.log('Upload success:', response.data);
    } catch (err) {
      setError('Failed to upload the file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        setData(response.data); 
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }
  const batchMethods = data.batch;

  return (
    
      <>
        {/* Include the NavBar here */}
        <NavBar />
    
        <div className="flex justify-center items-center min-h-screen px-4">
  <Tabs defaultValue="list" className="w-full">
    <TabsList className="flex space-x-6">
      <TabsTrigger value="list" className="py-2 px-6 cursor-pointer">
        List of Batch
      </TabsTrigger>
      <TabsTrigger value="received" className="py-2 px-6 cursor-pointer">
        Received Batch
      </TabsTrigger>
      <TabsTrigger value="upload" className="py-2 px-6 cursor-pointer">
        Upload Batch
      </TabsTrigger>
    </TabsList>

    <div className="w-full flex flex-col">
      {/* Ensure the tab content is consistent in size */}
      <TabsContent value="list" className="py-4 px-6 overflow-y-auto flex-1">
        <h2 className="text-xl font-semibold">List of Batch</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <Table className="min-w-full">
              <TableCaption>A list of your recent batches.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Filename</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map(file => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.id}</TableCell>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell>{new Date(file.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </TabsContent>

      <TabsContent value="received" className="py-4 px-6 overflow-y-auto flex-1">
        <h2 className="text-xl font-semibold">Received Batch</h2>
        <div className="w-full max-w-4xl mx-auto mt-8">
          <Table>
            <TableCaption>A list of batch operations and their methods.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(batchMethods).map((key) => {
                const { method, url } = batchMethods[key];
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>{method}</TableCell>
                    <TableCell>{url}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="upload" className="py-4 px-6 overflow-y-auto flex-1">
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Upload Batch</h2>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="picture" className="block text-lg">Choose a file</label>
              <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

            <button
              onClick={handleUpload}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </div>
      </TabsContent>
    </div>
  </Tabs>
</div>

    </>
  );
};

export default Batch;
