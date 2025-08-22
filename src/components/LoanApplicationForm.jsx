import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const LoanApplicationForm = ({ onSubmit, loanProductId }) => {
  // Fetch customerId from localStorage (expects { id: ... } in customer object)
  const [form, setForm] = useState(() => {
    let customerId = '';
    try {
      const customer = localStorage.getItem('customer');
      if (customer) {
        const parsed = JSON.parse(customer);
        customerId = parsed.customerId || '';
      }
    } catch (e) {
      customerId = '';
    }
    return {
      applicationDate: new Date().toISOString().slice(0, 10),
      approvalStatus: "Pending",
      loanAmount: "",
      customerId,
      loanProductId: loanProductId || "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, applicationDate: date.toISOString().slice(0, 10) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-200" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Application Date</label>
        <input
          type="date"
          name="applicationDate"
          value={form.applicationDate}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Approval Status</label>
        <input
          type="text"
          name="approvalStatus"
          value={form.approvalStatus}
          readOnly
          className="input input-bordered w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Loan Amount</label>
        <input
          type="number"
          name="loanAmount"
          value={form.loanAmount}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Customer ID</label>
        <input
          type="text"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Loan Product ID</label>
        <input
          type="text"
          name="loanProductId"
          value={1452}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <Button type="submit" className="mt-2 w-full">Submit Application</Button>
    </form>
  );
};

export default LoanApplicationForm;
