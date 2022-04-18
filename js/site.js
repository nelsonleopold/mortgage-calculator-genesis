// get the loan values from the page
function getValues() {

    // step one: get values from the page
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let numMonthlyPayments = parseInt(document.getElementById("numMonthlyPayments").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);

    // check input values for proper data types
    if (isNaN(loanAmount)) {
        alert("Enter a valid amount. Must be a number.");
        document.getElementById("loanAmount").focus();
    } else if (isNaN(numMonthlyPayments)) {
        alert("Enter a valid payment term. Enther the number of monthly payments for the loan.");
        document.getElementById("numMonthlyPayments").focus();
    } else if (isNaN(interestRate)) {
        alert("Enter a valid loan rate as a whole number. Eg. 3% should be entered as 3.");
        document.getElementById("interestRate").focus();
    } else {
        // step two: call buildSchedule
        let payments = buildSchedule(loanAmount, interestRate, numMonthlyPayments);

        // call displayData might need additional parameters
        displayData(payments);
    }
}

// build the amortization schedule
function buildSchedule(amount, rate, term) {
    let amortPayments = [];

    let totalMonthlyPayment = (amount) * (rate / 1200) / (1 - (1 + rate / 1200) ** (-term));
    let remainingBalance = amount;
    let interestPayment = remainingBalance * rate / 1200;
    let principalPayment = totalMonthlyPayment - interestPayment;
    // remainingBalance = remainingBalance - principalPayment;
    let totalInterest = interestPayment;

    // let newRemainingBalance = remainingBalance - principalPayment;



    for (let i = 1; i <= term; i++) {

        let curPayment = {
            month: 0,
            payment: 0,
            principal: 0,
            interest: 0,
            totalInterest: 0,
            balance: 0
        };

        remainingBalance -= principalPayment;
        // add data to object
        curPayment.month = i;
        curPayment.payment = totalMonthlyPayment.toFixed(2);
        curPayment.principal = principalPayment.toFixed(2);
        curPayment.interest = interestPayment.toFixed(2);
        curPayment.totalInterest = totalInterest.toFixed(2);
        curPayment.balance = remainingBalance.toFixed(2);

        // add data from each object to array
        amortPayments.push(curPayment);


        interestPayment = remainingBalance * rate / 1200;
        totalInterest += interestPayment;
        principalPayment = totalMonthlyPayment - interestPayment;
    }

    // return array of payment objects
    return amortPayments;
}

// display the data
// display the table of payments and the summary info at the top of the page
function displayData(payments) { // may need additional parameters
    // get a hook into the template
    let template = document.getElementById("amortData-template");
    // get hook into the table body
    let amortBody = document.getElementById("amortBody");
    // clear previous data
    amortBody.innerHTML = "";

    // insert monthly payment amount into summary section
    let sumMonPay = payments[0].payment;
    document.getElementById("summaryMonthlyPayment").innerHTML = `$${sumMonPay}`;

    // insert total prinicpal amount into summary section
    let sumTotalPrincipal = parseFloat(payments[0].balance) + parseFloat(payments[0].principal);
    document.getElementById("summaryTotalPrincipal").innerHTML = `$${sumTotalPrincipal.toLocaleString("en-US", 
    {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })}`;

    // insert total interest amount into summary section
    let sumTotalInterest = parseFloat(payments[payments.length - 1].totalInterest);
    document.getElementById("summaryTotalInterest").innerHTML = `$${sumTotalInterest.toLocaleString("en-US",
    {
    minimumFractionDigits:2,
    maximumFractionDigits:2
    })}`;

    // insert total cost amount into summary section
    // toFixed turns these into strings, so have to convert again
    let sumTotalCost = parseFloat(sumTotalPrincipal) + parseFloat(sumTotalInterest);
    document.getElementById("summaryTotalCost").innerHTML = `$${sumTotalCost.toLocaleString("en-US",
    {
    minimumFractionDigits:2,
    maximumFractionDigits:2
    })}`;

    // loop over objects in payments array and write a row
    // for each object into the body
    for (let i = 0; i < payments.length; i++) {
        // grab all nodes from the template (amortData-template), including
        // child nodes (true
        let amortRow = document.importNode(template.content, true);

        // grab only and all the columns from the template
        let amortCols = amortRow.querySelectorAll("td");

        amortCols[0].textContent = payments[i].month;
        amortCols[1].textContent = payments[i].payment;
        amortCols[2].textContent = payments[i].principal;
        amortCols[3].textContent = payments[i].interest;
        amortCols[4].textContent = payments[i].totalInterest;
        amortCols[5].textContent = payments[i].balance;

        amortBody.appendChild(amortRow);
    }

}