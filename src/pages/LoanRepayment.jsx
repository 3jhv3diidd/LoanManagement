import JSHeader from "@/components/JSHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle } from "lucide-react";

const LoanRepayment = () => {
  // Static data for loans with dues and payment history
  const loansData = [
    {
      id: "HL001234",
      type: "Home Loan",
      totalAmount: "$450,000",
      remainingAmount: "$320,000",
      monthlyEMI: "$2,450",
      nextDueDate: "2024-02-15",
      isDue: true,
      dueAmount: "$2,450",
      paymentHistory: [
        { date: "2024-01-15", amount: "$2,450", status: "Completed" },
        { date: "2023-12-15", amount: "$2,450", status: "Completed" },
        { date: "2023-11-15", amount: "$2,450", status: "Completed" },
        { date: "2023-10-15", amount: "$2,450", status: "Completed" },
        { date: "2023-09-15", amount: "$2,450", status: "Completed" }
      ]
    },
    {
      id: "PL001234",
      type: "Personal Loan",
      totalAmount: "$50,000",
      remainingAmount: "$25,000",
      monthlyEMI: "$1,200",
      nextDueDate: "2024-02-20",
      isDue: false,
      dueAmount: "$0",
      paymentHistory: [
        { date: "2024-01-20", amount: "$1,200", status: "Completed" },
        { date: "2023-12-20", amount: "$1,200", status: "Completed" },
        { date: "2023-11-20", amount: "$1,200", status: "Completed" }
      ]
    },
    {
      id: "VL001234",
      type: "Vehicle Loan",
      totalAmount: "$80,000",
      remainingAmount: "$45,000",
      monthlyEMI: "$1,800",
      nextDueDate: "2024-02-10",
      isDue: true,
      dueAmount: "$3,600", // Overdue - 2 months
      paymentHistory: [
        { date: "2023-11-10", amount: "$1,800", status: "Completed" },
        { date: "2023-10-10", amount: "$1,800", status: "Completed" },
        { date: "2023-09-10", amount: "$1,800", status: "Completed" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <JSHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Loan Dues & Payment History</h1>
            <p className="text-muted-foreground">View your outstanding dues and payment history for all loans</p>
          </div>

          {/* Loan Cards */}
          <div className="space-y-6">
            {loansData.map((loan) => (
              <Card key={loan.id} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{loan.type}</span>
                        <span className="text-sm text-muted-foreground">({loan.id})</span>
                      </CardTitle>
                      <CardDescription>
                        Remaining: {loan.remainingAmount} | Monthly EMI: {loan.monthlyEMI}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      {loan.isDue ? (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <Badge variant="destructive">Due: {loan.dueAmount}</Badge>
                        </div>
                      ) : (
                        <Badge variant="secondary">No Dues</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Due Information */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Due Information</span>
                      </h4>
                      {loan.isDue ? (
                        <div className="space-y-2 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Due Amount:</span>
                            <span className="font-medium text-destructive">{loan.dueAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Due Date:</span>
                            <span className="font-medium">{loan.nextDueDate}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-green-700 dark:text-green-400 font-medium">No outstanding dues</p>
                          <p className="text-sm text-green-600 dark:text-green-500">Next EMI due on {loan.nextDueDate}</p>
                        </div>
                      )}
                    </div>

                    {/* Payment History */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Recent Payments</span>
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {loan.paymentHistory.map((payment, index) => (
                          <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded">
                            <div>
                              <p className="text-sm font-medium">{payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{payment.amount}</p>
                              <p className="text-xs text-green-600">{payment.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoanRepayment;