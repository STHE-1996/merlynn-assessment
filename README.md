# Next.js Drink Choice Application

This application is built using **Next.js**, **React**, **TailwindCSS**, **MongoDB**, , **sharedcn**,and **Mongoose**. It integrates with the [TOM API](https://docs.up2tom.com) to pull metadata, allow users to make decisions, and store results. This project showcases skills in **Next.js framework usage** and **API integration**.

---

## Features

1. **Metadata Retrieval**: Pulls metadata from the TOM API for the "Drink choice" model https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12.
2. **User Decision Form**: Displays a form for users to provide input variables and submit decisions.
3. **API Integration**:
   - Fetch metadata using the `v3/models` and `v3/models/{id}` endpoints.
   - Submit user inputs to the `v3/decision/{id}` endpoint.
4. **Data Storage**: Saves user decisions and input variables using MongoDB.
5. **Security**: Includes basic security best practices like `.env` for API keys and sanitized API requests.
6. **Batch Functionality**: Implements batch requests for bulk decision-making.
7. **Model Selection**: Allows users to select any model from the TOM API dynamically.

---

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud database)
- TOM API Key (provided in the requirements)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/drink-choice-app.git
cd drink-choice-app
