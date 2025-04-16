# Personal Finance Visualizer

This is a [Next.js](https://nextjs.org) project designed to help users visualize and manage their personal finances. The application provides features like adding transactions, viewing monthly expenses, category breakdowns, and budget comparisons.

## Features

- Add, edit, and delete transactions.
- Visualize monthly expenses using bar charts.
- View spending insights and category breakdowns with pie charts.
- Compare actual expenses against a predefined budget.
- Responsive design for seamless use on all devices.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd personal-finance-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Components

### UI Components

- **Button**: A reusable button component with multiple variants and sizes.
- **Input**: A styled input component for forms.
- **Label**: A label component for form fields.

### Functional Components

- **AddTransaction**: A form to add new transactions with fields for amount, description, category, and date.
- **TransactionList**: Displays a list of transactions with options to edit or delete.
- **SummaryCards**: Shows a summary of total expenses and category breakdowns.
- **MonthlyChart**: A bar chart to visualize monthly expenses.
- **CategoryPieChart**: A pie chart to display expenses by category.
- **BudgetComparisonChart**: Compares actual expenses against a predefined budget.
- **SpendingInsights**: Provides insights based on total spending.

### Utility Components

- **RemoveInjectedAttributes**: Removes attributes injected by browser extensions like Grammarly.

## Working

1. **Add Transactions**: Use the "Add Transaction" form to add new transactions. You can specify the amount, description, category, and date.
2. **View Transactions**: The transactions are displayed in a list format. You can edit or delete any transaction.
3. **Visualize Data**:
   - Monthly expenses are displayed in a bar chart.
   - Category-wise expenses are shown in a pie chart.
   - Budget vs. actual expenses are compared in a bar chart.
4. **Spending Insights**: Get insights based on your total spending for the month.

## Folder Structure

```
personal-finance-visualizer/
├── src/
│   ├── app/
│   │   ├── api/transactions/route.jsx  # API routes for transactions
│   │   ├── layout.jsx                 # Root layout component
│   │   └── page.jsx                   # Main dashboard page
│   ├── components/
│   │   ├── AddTransaction.jsx         # Add transaction form
│   │   ├── TransactionList.jsx        # List of transactions
│   │   ├── SummaryCards.jsx           # Summary of expenses
│   │   ├── MonthlyChart.jsx           # Monthly expenses chart
│   │   ├── CategoryPieChart.jsx       # Category-wise expenses chart
│   │   ├── BudgetComparisonChart.jsx  # Budget vs actual chart
│   │   ├── SpendingInsights.jsx       # Spending insights
│   │   └── ui/                        # UI components (Button, Input, Label)
│   ├── lib/
│   │   ├── dbConnect.jsx              # MongoDB connection utility
│   │   └── utils.jsx                  # Utility functions
│   ├── models/
│   │   └── Transaction.jsx            # Mongoose model for transactions
│   └── app/globals.css                # Global styles
├── public/                            # Static assets
├── next.config.mjs                    # Next.js configuration
├── package.json                       # Project dependencies
└── README.md                          # Project documentation
```

## API Endpoints

### GET `/api/transactions`

Fetch all transactions or a specific transaction by ID.

### POST `/api/transactions`

Add a new transaction. Requires `amount`, `description`, `category`, and `date` in the request body.

### PUT `/api/transactions`

Update an existing transaction by ID. Requires `id` as a query parameter and updated fields in the request body.

### DELETE `/api/transactions`

Delete a transaction by ID. Requires `id` as a query parameter.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, MongoDB, Mongoose
- **Charts**: Recharts

## Deployment

The application can be deployed on [Vercel](https://vercel.com/). Follow the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License.
