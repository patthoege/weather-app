# Weather App - Manual Testing

## Introduction
This guide provides step-by-step instructions to manually test the functionality of the Weather App. The testing process will cover various features of the application to ensure it works as expected.

## Test Cases

### 1. Application Launch

**Objective**: Verify that the application launches correctly.

**Steps**:
1. Navigate to the URL where the application is hosted.
2. Observe the loading process.

**Expected Result**: 
- The application should load without errors.
- The main page should display a search bar and a prompt to enter a location.

### 2. Search for Weather by City Name

**Objective**: Test the functionality of searching for weather by city name.

**Steps**:
1. In the search bar, type the name of a city (e.g., "New York").
2. Press "Enter" or click on the search icon.

**Expected Result**:
- The application should display the current weather details for the specified city.
- The details should include temperature, weather conditions, humidity, wind speed, etc.

### 3. Search for Weather by Zip Code

**Objective**: Test the functionality of searching for weather using a zip code.

**Steps**:
1. In the search bar, enter a valid zip code (e.g., "10001").
2. Press "Enter" or click on the search icon.

**Expected Result**:
- The application should display the current weather for the area corresponding to the entered zip code.

### 4. Invalid City Name or Zip Code

**Objective**: Verify how the application handles invalid input.

**Steps**:
1. In the search bar, enter an invalid city name or zip code (e.g., "InvalidCity" or "12345xyz").
2. Press "Enter" or click on the search icon.

**Expected Result**:
- The application should display an appropriate error message indicating that the city or zip code could not be found.

### 5. Check Weather Details Display

**Objective**: Ensure all relevant weather details are displayed correctly.

**Steps**:
1. Search for a valid city or zip code.
2. Review the weather details presented on the page.

**Expected Result**:
- All details such as temperature, weather condition (e.g., sunny, cloudy), humidity, wind speed, etc., should be displayed clearly and accurately.
- Verify the units of measurement (e.g., Celsius/Fahrenheit for temperature, km/h or mph for wind speed).

### 6. Responsive Design

**Objective**: Verify the application's responsiveness on different screen sizes.

**Steps**:
1. Resize the browser window to various dimensions (e.g., mobile, tablet, desktop).
2. Observe the layout and functionality.

**Expected Result**:
- The layout should adjust properly to different screen sizes.
- All features should remain accessible and usable.

### 7. Refreshing the Page

**Objective**: Check the application's behavior when the page is refreshed.

**Steps**:
1. Perform a weather search.
2. Refresh the browser page.

**Expected Result**:
- The application should maintain the search result after the refresh or return to the home state without errors.
  
### 9. Viewing Weather for Current Location

**Objective**: Test the functionality of viewing weather for the user's current location.

**Steps**:
1. Click on the option to detect and display weather for the current location.
2. Allow the application to access the location data if prompted.

**Expected Result**:
- The application should display the weather for the user's current location accurately.

