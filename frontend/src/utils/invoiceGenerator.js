import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { showSuccessToast, showErrorToast } from '../helper/MyToast';

export const downloadSimulatedPdfInvoice = (orderRecord, cartItems, totals, paymentMethod) => {
    if (!orderRecord || !cartItems || !totals) {
        showErrorToast("Incomplete transaction payload data boundaries detected.");
        return;
    }

    try {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageLeftMargin = 15;
        const pageRightMargin = 195;
        let currentVerticalY = 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(17, 17, 17);
        doc.text("SCENTSÔ", pageLeftMargin, currentVerticalY);

        doc.setFontSize(9);
        const statusStringText = paymentMethod === 'COD' ? 'STATUS: UNPAID (COD DUE)' : 'STATUS: SIMULATED PAID';
        const statusTextWidth = doc.getTextWidth(statusStringText);
        doc.setFillColor(17, 17, 17);
        doc.rect(pageRightMargin - statusTextWidth - 4, currentVerticalY - 5, statusTextWidth + 4, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(statusStringText, pageRightMargin - statusTextWidth - 2, currentVerticalY);

        currentVerticalY += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("LA MAISON OLFACTIVE", pageLeftMargin, currentVerticalY);

        doc.setFont("helvetica", "normal");
        const ticketNoText = `TICKET NO: ${orderRecord._id || 'MOCK-2026-SANDBOX'}`;
        doc.text(ticketNoText, pageRightMargin - doc.getTextWidth(ticketNoText), currentVerticalY);

        // Minimalist horizontal separation borderline grid axis anchor
        currentVerticalY += 8;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.4);
        doc.line(pageLeftMargin, currentVerticalY, pageRightMargin, currentVerticalY);

        currentVerticalY += 12;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 160);
        doc.text("CLIENT PROFILE CREDENTIALS", pageLeftMargin, currentVerticalY);
        doc.text("CARGO DESPATCH ALLOCATION", 110, currentVerticalY);
        currentVerticalY += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(17, 17, 17);

        const clientFullName = (orderRecord.user?.fullName || orderRecord.fullName || "ELITE COLLECTOR").toUpperCase();
        doc.text(clientFullName, pageLeftMargin, currentVerticalY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);

        const destinationStr = (orderRecord.address || "MAISON DESTINATION NOT FOUND").toUpperCase();
        const physicalMailingAddressLines = doc.splitTextToSize(destinationStr, 80);
        doc.text(physicalMailingAddressLines, 110, currentVerticalY);

        currentVerticalY += 5;
        doc.text(orderRecord.email || "PORTFOLIO@TESTING.COM", pageLeftMargin, currentVerticalY);

        currentVerticalY += 5;
        doc.setFont("courier", "normal");
        doc.text(orderRecord.phone || "03001234567", pageLeftMargin, currentVerticalY);

        doc.setFont("helvetica", "bold");
        doc.text((orderRecord.city || "KARACHI").toUpperCase(), 110, currentVerticalY + (physicalMailingAddressLines.length * 2));

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 160);
        const issuedString = `ISSUED TIMELINE INDEX: ${new Date().toLocaleDateString()}`;
        doc.text(issuedString, 110, currentVerticalY + (physicalMailingAddressLines.length * 2) + 4);

        // 4. Transform Local Cart Elements Into Pristine Tabular Arrays Matrix
        const formattedTableRowsRows = cartItems.map((row, index) => {
            const product = row.item;
            const computedLineSumTotal = (product?.price || 0) * (row.quantity || 1);
            return [
                String(index + 1).padStart(2, '0'),
                (product?.title || 'PREMIUM FRAGRANCE FORMULATION').toUpperCase(),
                String(row.quantity),
                `PKR ${product?.price?.toLocaleString()}`,
                `PKR ${computedLineSumTotal.toLocaleString()}`
            ];
        });

        currentVerticalY += 15;
        doc.autoTable({
            startY: currentVerticalY,
            head: [['#', 'SELECTED LUXURY SCENT SPECS', 'QTY', 'UNIT RATE', 'LINE AMOUNT']],
            body: formattedTableRowsRows,
            theme: 'plain',
            headStyles: {
                fillColor: false,
                textColor: 17,
                fontSize: 8,
                fontStyle: 'bold',
                halign: 'left'
            },
            bodyStyles: {
                textColor: 80,
                fontSize: 9,
                font: 'helvetica'
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { fontStyle: 'bold' },
                2: { halign: 'center', cellWidth: 15 },
                3: { halign: 'right', font: 'courier', cellWidth: 30 },
                4: { halign: 'right', font: 'courier', fontStyle: 'bold', cellWidth: 35 }
            },
            didParseCell: (data) => {
                data.cell.styles.lineWidth = { bottom: 0.1 };
                data.cell.styles.lineColor = 220;
            }
        });

        let landingFinancialsY = doc.lastAutoTable.finalY + 12;

        const summaryLabelsX = 130;
        const valueNumbersX = pageRightMargin;
        doc.setFontSize(9);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Boutique Base Subtotal:", summaryLabelsX, landingFinancialsY);
        doc.setFont("courier", "normal");
        doc.setTextColor(17, 17, 17);
        doc.text(`PKR ${totals.subTotal?.toLocaleString()}`, valueNumbersX - doc.getTextWidth(`PKR ${totals.subTotal?.toLocaleString()}`), landingFinancialsY);

        landingFinancialsY += 6;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Integrated GST Tariff (15%):", summaryLabelsX, landingFinancialsY);
        doc.setFont("courier", "normal");
        doc.setTextColor(17, 17, 17);
        doc.text(`PKR ${totals.taxPrice?.toLocaleString()}`, valueNumbersX - doc.getTextWidth(`PKR ${totals.taxPrice?.toLocaleString()}`), landingFinancialsY);

        landingFinancialsY += 6;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Cargo Premium Delivery:", summaryLabelsX, landingFinancialsY);
        doc.setFont("courier", "normal");
        doc.setTextColor(17, 17, 17);
        const cargoFeeString = totals.shippingPrice === 0 ? 'FREE' : `PKR ${totals.shippingPrice}`;
        doc.text(cargoFeeString, valueNumbersX - doc.getTextWidth(cargoFeeString), landingFinancialsY);

        landingFinancialsY += 4;
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        doc.line(summaryLabelsX, landingFinancialsY, pageRightMargin, landingFinancialsY);

        landingFinancialsY += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(17, 17, 17);
        doc.text("GRAND TOTAL PAYABLE:", summaryLabelsX, landingFinancialsY);
        doc.setFont("courier", "bold");
        doc.setFontSize(12);
        const grandPayableStringText = `PKR ${totals.grandTotal?.toLocaleString()}`;
        doc.text(grandPayableStringText, valueNumbersX - doc.getTextWidth(grandPayableStringText), landingFinancialsY);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        doc.text("SANDBOX ENVIRONMENT VERIFICATION MANIFEST", 105, 272, { align: 'center' });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        const complianceDisclaimersParagraphText = "This automated invoice document serves strictly as a frontend structural simulation component for local software portfolio presentation checks. No real credit accounts have been queried or actual physical currency notes transfer operation fired onto real-world banking infrastructure lines during this user session validation framework.";
        const wrappedDisclaimerLinesTextSplit = doc.splitTextToSize(complianceDisclaimersParagraphText, 160);
        doc.text(wrappedDisclaimerLinesTextSplit, 105, 276, { align: 'center' });

        doc.save(`Scentso_Luxury_Invoice_${orderRecord._id || 'Sandbox'}.pdf`);
        showSuccessToast("Elite vector luxury invoice statement downloaded flawlessly!");

    } catch (engineCrashError) {
        console.error("Native PDF Compilation Cluster Failure:", engineCrashError);
        showErrorToast("Native print workflow failure. Verify console fields.");
    }
};