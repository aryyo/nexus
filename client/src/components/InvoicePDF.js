import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoicePDF = ({ invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(12);
    doc.text(`Order ID: ${invoice.orderId}`, 14, 32);
    doc.text(`Customer Name: ${invoice.customerName}`, 14, 40);
    doc.text(`Order Type: ${invoice.type}`, 14, 48);
    doc.text(`Status: ${invoice.status}`, 14, 56);
    doc.text(
      `Date Placed: ${new Date(invoice.datePlaced).toLocaleDateString()}`,
      14,
      64
    );

    autoTable(doc, {
      startY: 74,
      head: [["Item", "Subtotal", "Tax", "Shipping", "Total"]],
      body: [
        [
          invoice.item,
          `$${invoice.subtotal.toFixed(2)}`,
          `$${invoice.tax.toFixed(2)}`,
          `$${invoice.shipping.toFixed(2)}`,
          `$${invoice.total.toFixed(2)}`,
        ],
      ],
    });

    doc.save(`invoice-${invoice.orderId}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="download-button">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  );
};

export default InvoicePDF;
