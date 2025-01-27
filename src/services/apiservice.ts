
import connectToDB from '@/utils/connectToDB';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


const API_BASE_URL = 'https://api.up2tom.com/v3/';
const BEARER_TOKEN = '9307bfd5fa011428ff198bb37547f979';

// Function to fetch model data
export const fetchModelData = async (modelId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}models/${modelId}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching model data', error);
    throw error;
  }
};


export const getRecommendation = async (modelId: string, userInput: object) => {
    try {
      const requestData = {
        data: {
          type: "scenario",
          attributes: {
            input: userInput
          }
        }
      };
  
      const response = await axios.post(
        `${API_BASE_URL}decision/${modelId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        }
      );
  
      // Assuming the relevant data is under response.data.data.attributes
      return response.data.data.attributes;
    } catch (error) {
      console.error('Error getting recommendation', error);
      throw error;
    }
  };

  
  export const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}models`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      
      // Extract the data part from the response and return only the relevant information
      return response.data.data.map((model: any) => ({
        id: model.id,
        name: model.attributes.name,
        description: model.attributes.description,
      }));
    } catch (error) {
      console.error('Error fetching model data', error);
      throw error; 
    }
  };
  
 