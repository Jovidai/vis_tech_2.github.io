/*
QUESTION 1:

Examine the d3.csv().then() pattern below
and discuss the following questions:
    - What is the "./data/gapminder.csv" inside of
        inside of the parentheses for d3.csv()
        referring to?
    *Answer: The "./data/gapminder.csv" inside of the parentheses for d3.csv()
        referring to a CSV file, URL of a CSV file, webapi, or web services, which will return csv data.
        In other words, it means to read data from a file and indicates comma-separated values.

    - What is the parameter named `data` inside of
        the function expression within .then()
        referring to?
    *Answer: The parameter named `data` inside of the function expression within .then()
        referring to callback previous dataset "gapminder.csv" and renaming a name for the dataset.

    - What kind of JS data structure is `data`?
    *Answer: In terms of the what kinds of JS data structure is `data,` 
    JavaScript has primitive (built-in) and non-primitive (not built-in) data structures.

    - Where does the entire d3.csv().then() pattern
        open and close in this document?
    *Answer: The entire d3.csv().then() pattern open and close in this document located from 
    line 33 to the end.

    You may find it useful to examine the contents
    of `data` with console.log(data)

*/

d3.csv("./data/gapminder.csv").then(function(data) {


    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS

    QUESTION 2:
        - What is document.querySelector("#chart") doing?
        *Answer: The .querySelector("#chart") returns the first element that matches the CSS selector "#chart."

        - `clientWidth` and `clientHeight` are properties of
            elements in the DOM (Document Object Model).
            What do these properties measure?
        *Answer: Using clientWidth and clientHeight, you are able to get the pixel dimensions of an HTML element, 
        including padding, but not the border, scrollbar, or margin.
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    /* FILTER THE DATA 
    
    This data set is large and includes data from multiple years.

    Let's filter the data to only select data for the United States,
    and then subsequently use those data to draw the bar chart.

    To filter the data, we can use the .filter() method for arrays.

    QUESTION 3:

    `.filter()` is a JavaScript array method.
    - What does this method do/how does this method work?
        (What do we get back from using this method?)
    *Answer: The filter() method creates a new array filled with elements that pass a test provided by a function, 
    and the filter() method does not execute the function for empty elements. 
    Also, the filter() method does not change the original array.

    - Inside the parentheses for .filter(), there is
        a function expression with a parameter
        named `d`. What is `d` a reference to?
    *Answer: `d` refers to filter values you want to a new array from an array of all values.

    - Does that parameter *have to be* named `d`?
        Can it be named something else?
    *Answer: No, that parameter does not have to be named `d`, and it can be named something else. 
    But you need to make sure you will keep consistency for the name you named.

    - What is the purpose of the statement inside
        the function expression? What is this doing?

        return d.year === '2007';
    
    *Answer: The purpose of the statement inside the function expression is to filter all the elements and return the element that matches, 
    and the element that does not match is removed. 

     return d.year === '2007' means the function expression is to filter all the years in the dataset 
     and return the year "2007" that matches in the CSV file.



    - Why are we storing the result of data.filter(...)
        inside a variable (filtered_data)?
    *Answer: We are storing the result of data.filter(...) inside a variable (filtered_data) because data filtering can help you eliminate unnecessary data. For example, 
    if you want to find out the total number of records in a dataset with two different types of fields, such as integers and strings, 
    then you can use data filtering to filter out all records with either type of field in them.

    */

    let filtered_data = data.filter(function(d) {
        return d.country === 'United States';
    });

    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES

    In the following section, we'll use the methods d3.min() and d3.max()
    to calculate minimum and maximum values of the variables in our data set.

    Note that to keep things clean, we're organizing the minimum and maximum
    values inside of objects, and storing those min/max values in properties
    named inside those objects. This helps make it easier to refer to these
    values later in our code.


    QUESTION 4:
        - What does d3.min() do? What does d3.max() do?
            What are the 2 arguments we supply to d3.min()/d3.max()?
        *Answer: d3.min() is used to return the minimum value in the given array using natural order. 
        d3.max() is used to return the maximum value in the given array using natural order. The 2 arguments we supply to d3.min()/d3.max() are the given iterable of values, 
        like minimum value and maximum value.

        - In the second argument for both d3.min() and d3.max(),
            the function expression has a parameter named `d`.
            What is `d` a reference to?
        *Answer: `d` refers to a function that returns a joining key for each data element passed in.

        - Why is there a plus sign (+) in front of d.lifeExp?
        *Answer: There is a plus sign (+) in front of d.lifeExpIt because it forces the parser to treat the part following the + as an expression.

    */

    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };




    /*
    CREATE SCALES

    We'll use the computed min and max values to create scales for
    our scatter plot.

    QUESTION 5:
        - What does d3.scaleLinear() do?
        *Answer: The d3. scaleLinear() method is used to create a visual scale point. This method is used to transform data values into visual variables.

        - What does d3.scaleBand() do?
         *Answer: d3.scaleBand() is used to construct a new band scale with the domain specified as an array of values and the range as the minimum and maximum extents of the bands. 
         This function splits the range into n bands, where n is the number of values in the domain array.

        - What is the purpose of the .padding() in d3.scaleBand()?
         *Answer: The purpose of the .padding() in d3.scaleBand() is a convenience method that sets both paddingInner and paddingOuter values to the same value.

        - For each scale below, what does the domain
            represent, and what does the range represent?
         *Answer: The domain is the list of letters (sorted in descending frequency order). For each scale below, the domain represent the years from 1952 to 2007.
         The range — the chart's width in pixels — is evenly distributed among the letters, which are separated by a small gap. 
         For each scale below, the range represents to set "margin.left, width-margin.right" as the width for the chart.

        - For each scale below, how many values are in
            the domain and range?
         *Answer: For each scale below, there are 12 values in the domain, and there are 4 values in the range.


    */

    const xScale = d3.scaleBand()
        .domain(["1952","1957","1962","1967","1972","1977","1982","1987","1992","1997","2002","2007"])
        .range([margin.left, width-margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([50, lifeExp.max])
        .range([height-margin.bottom, margin.top]);


    /*
    DRAW AXES

    QUESTION 6:
    
    The following chunks of code draw 2 axes -- an x- an y-axis.
        - What is the purpose of the "g" element being appended?
        *Answer: The <g> SVG element is a container used to group other SVG elements. 
        In other words, g element is used to group SVG shapes together, so it is not d3 specific but specific to SVG attributes.

        - What is the purpose of the "transform" attribute being defined?
        *Answer: The purpose of the "transform" attribute being defined is to define it as a list of transform definitions applied to an element and the element's children.

        - What do the d3.axisBottom() and d3.axisLeft() methods do?
        *Answer: d3.axisBottom() is used to create a bottom horizontal axis. 
        This function will construct a new bottom-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6, and padding of 3.

        d3.axisLeft() is used to create a left vertical axis. 
        This function will construct a new left-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6, and padding of 3.

    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    /*
    DRAW BARS

    In this bar chart, each bar will represent a single year for the United States;
    the horizontal position of the bar will represent the year of data,
    vand the height of the bar will represent the life expectancy for that year.

    QUESTION 7:

    The following chunk of code is the standard D3 data join pattern.
        - What is the purpose of the pattern svg.selectAll().data().enter().append()?
        *Answer: The purpose of the pattern svg.selectAll() is it is used to select all the element that matches the specified selector string.

        The purpose of the pattern .data() is to bind data to a selection. 

        The purpose of the pattern .enter() is used to create the missing elements and return the enter selection.

        The purpose of the pattern .append() is used to append a new element to the HTML tag name as given in the parameters to the end of the element.

        - Each attribute defined below is defined using things called
            "accessor functions." In each accessor function, what is
            the parameter named `d` a reference to?
        *Answer: The parameter named `d` refers to the dataset we named before and tells the function that we will use these values from this dataset.

        - Inside each accessor function, what is the purpose of
            each "return ___;" statement?
        *Answer: The purpose of each "return___;" statement is to end the function execution and specify a value to be returned to the function caller. 
        The function will stop executing when the return statement is called.

        - What does xScale.bandwidth() compute? How is that value being used here?
        *Answer: The xScale.bandwidth() is used to find the width of each band, and this function does not accept any parameter. For the return Values, this function returns the width of each band. Here, the value of the width is set as default.

        - What is going on with the calculation for the "height" attribute?
            Explain how the expression inside the accessor function for this
            attribute works.
        ***Answer: For the "height" attribute, the expression inside the accessor function for this attribute uses "height - margin.bottom" substracts "yScale(d.lifeExp)" to get the value of the height.

    */
    const points = svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.lifeExp); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.lifeExp); })
            .attr("fill", "steelblue");
    
    /*
    DRAW AXIS LABELS

    QUESTION 8:

    The chunks of code below draw text labels for the axes.

    Examine the yAxisLabel. What is going on with the 
    "transform", "x", and "y" attributes, in terms of
    how their values are computed to control the rotated
    placement of the label?
    ***Answer: The "transform" function uses "-90" to change the angel of the label in the y-axis. Their ("x" and "y") values are computed to control the rotated placement of the label by using "-height/2" and "margin.left/2" to set up the correct position of the label in the y-axis.

    */
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Year");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy (Years)");

});
