# Country and Location Information App

This JavaScript application uses the Geolocation API, Fetch API, and Promises to display country details based on the user’s current location. It also fetches and displays information about neighboring countries, enhancing the understanding of geographical and regional details. The key concepts covered in this app include:

## Topics Covered

### 1. **Geolocation API**:

- Promisifying the Geolocation API to obtain the user’s current latitude and longitude coordinates.

### 2. **Fetch API and Async/Await**:

- Using the Fetch API with `async/await` to handle API requests and responses for better readability and error management.
- Fetching data from RESTful APIs (`https://geocode.xyz` and `https://restcountries.com`) to retrieve location and country details.

### 3. **Handling JSON Data**:

- Parsing JSON responses and extracting relevant data fields such as population, languages, currencies, and neighboring countries.

### 4. **DOM Manipulation**:

- Dynamically rendering HTML content based on API responses to display country details, including country name, region, population, languages, currencies, and flags.

### 5. **Error Handling**:

- Implementing error handling using `try-catch` blocks in the async function.
- Displaying user-friendly error messages in the UI when data fetches fail or if the country does not have borders.

### 6. **Code Structure and Modularity**:

- Organizing code for readability by separating `renderCountry` and `renderError` functions to encapsulate different UI operations.
- Use of `const` and `let` for variable declarations to maintain strict scoping.
