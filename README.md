# Koinx API

Welcome to the Koinx API documentation. This API allows users to interact with the cryptocurrency system, fetching information about crypto assets and performing CRUD operations.

## 🌐 Base URL

The base URL for all API requests is:

[https://koinx-assignment-9rhy.onrender.com](https://koinx-assignment-9rhy.onrender.com)

## 🚀 Features

### 1. **Fetch and Store Cryptocurrency Data**
- Automatically fetches data for Bitcoin, Ethereum, and Matic every 2 hours using a background cron job.

### 2. **MongoDB Storage**
- Each fetched record is stored in a MongoDB database for historical analysis.

### 3. **Statistical Analysis**
- Calculates standard deviation of cryptocurrency prices based on historical records.

### 4. **API Endpoints**
- Simple and accessible RESTful endpoints to retrieve cryptocurrency stats, historical data, and statistical analysis.

## API Endpoints

### Latest Coin Data

url : [https://koinx-assignment-9rhy.onrender.com/stats?coin=coinName](https://koinx-assignment-9rhy.onrender.com/stats?coin=coinName)

Example Url : [https://koinx-assignment-9rhy.onrender.com/stats?coin=bitcoin](https://koinx-assignment-9rhy.onrender.com/stats?coin=bitcoin)

```python
response : {
  "price": 94350,
  "marketCap": 1868932075661.4084,
  "24hChange": -0.4801124326228051
}
````

### Deviation of the Crypto Price 

url : [https://koinx-assignment-9rhy.onrender.com/deviation?coin=coinName](https://koinx-assignment-9rhy.onrender.com/deviation?coin=coinName)

Example Url : [https://koinx-assignment-9rhy.onrender.com/deviation?coin=bitcoin](https://koinx-assignment-9rhy.onrender.com/deviation?coin=bitcoin)

```python
response : {
  deviation : 8042.48
}
