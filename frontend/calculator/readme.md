# Calculator
Check for the math library documentation on: https://mathjs.org/docs/reference/functions.html
 
## Calculation process
* Load/Receive resource
* Set config
* Roll-Out calculation process
######
* Method 1
    * Get all the calculations individually from each other, each from the base resource
    * Set the sum/average of each calculation
    * Recalculate to correct from the other calculations
    * (repeat ? times)
######
* Method 2
    * Get all the calculations individually from each other, each from the base resource
    * For each calculation (aka number of functions). Daisy chain all the other
         calculations (aka all the rest of the functions, so now you've done numberOfFunctionsnumberOfFunctions)
    * Set the sum/average of each calculation
    * Recalculate to correct from the other calculations
######
* Method 3
    * Daisy chain all the calculations after each other.
    * Recalculate to correct from the other calculations
    * (repeat ? times)
######
* Save/Catch result
* Return result

# Ideas
* Make it also possible that you can control the amplitude of a sinus wave linear or quadratic over time, so it can get bigger and bigger.
    * Maybe with that all the functions can have 'effects'?