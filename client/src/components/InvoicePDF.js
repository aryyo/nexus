import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoicePDF = ({ invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const primaryColor = "#8657ff"; 
    const textColor = "#0b0324"; 
    const borderColor = "#e2dcf7"; 

    doc.setFillColor(primaryColor);
    doc.rect(14, 10, 30, 30, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(16);
    doc.text("NEXUS", 19, 28);

    doc.setTextColor(textColor);
    doc.setFontSize(10);
    doc.text("Nexus Order Management", 50, 20);
    doc.text("Riverside, CA 92503", 50, 25);
    doc.text("909-736-9877", 50, 30);

    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.text("INVOICE", 14, 55);

    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(`Order ID: ${invoice.orderId}`, 14, 65);
    doc.text(`Customer Name: ${invoice.customerName}`, 14, 70);
    doc.text(`Order Type: ${invoice.type}`, 14, 75);
    doc.text(`Status: ${invoice.status}`, 14, 80);
    doc.text(
      `Date Placed: ${new Date(invoice.datePlaced).toLocaleDateString()}`,
      14,
      85
    );

    autoTable(doc, {
      startY: 95,
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
      styles: {
        textColor: textColor,
        lineColor: borderColor,
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: "#ffffff",
      },
      alternateRowStyles: {
        fillColor: "#f8f6ff", 
      },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(borderColor);
    doc.line(14, pageHeight - 30, 196, pageHeight - 30);
    doc.setFontSize(8);
    doc.setTextColor(textColor);
    doc.text("Thank you for your business!", 14, pageHeight - 20);
    doc.text("For questions about this invoice, please contact support@nexus.com", 14, pageHeight - 15);

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
