import axios from 'axios';

// export const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
export const baseUrl = "https://bible-star-server.vercel.app/api";

const customHeaders = {
    "Accept": 'application/json',
    "Access-Control-Allow-Origin": "*"
};

export const BSFetch = axios.create({
    headers: customHeaders
})