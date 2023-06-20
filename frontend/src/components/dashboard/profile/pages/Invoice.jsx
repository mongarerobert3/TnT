import React from 'react';
import './index.css';
import { logo } from '../../../../assets';


const Invoice = () => {
  // Auto No.
  const invoiceNumbers = document.querySelectorAll('.invoice-numbers');
  invoiceNumbers.forEach((number, index) => {
    number.textContent = index + 1;
  });

  return (
    <>
      <div className="i-download">
        <button className='btn-explore'>Download</button>
      </div>
    <div className="invoice">
      <div class="header-invoice">
        <div class="header-left">
          <div className='img-n-header'>
            <img src={logo} alt="logo" className="w-60 h-60" />
            <h1>Tours and <span>Travel</span></h1>
          </div>   
        </div>
        <div class="header-right">
          <div class="invoice-text">Invoice</div>
          <div class="dates p-method">
            <div>
              <h3>Invoice No:</h3>
              <h3>Due Date:</h3>
              <h3>Invoice Date</h3>
            </div>
            <div>
              <h3>###123</h3>
              <h3>June 19, 2023</h3>
              <h3>June 19, 2023</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='invoice-details'>
        <h3><i class="bi bi-telephone-fill"></i>(254) 456-7890</h3>
        <h3><i class="bi bi-envelope-fill"></i>travels@gmai.com</h3>
        <h3><i class="bi bi-geo-alt-fill"></i>Nairobi</h3>
      </div>
      <div className='header-invoice customer-info'>
        <div className='i-user-detail'>
          <h3 className='i-to'>INVOICE TO:</h3>
          <h3 className='i-u-name'>John Doe</h3>
          <h3>123456.address</h3>
          <h3>+25471258965</h3>
        </div>
        <div className='invoice-p-info'>
          <h3 className='i-to'>PAYMENT METHOD</h3>
          <div className='p-method'>
            <div>
              <h3>Account No</h3>
              <h3>Account Name</h3>
              <h3>Branch Name</h3>
            </div>
            <div>
              <h3>12***3456</h3>
              <h3>John</h3>
              <h3>XYZ</h3>
            </div>
          </div>
          </div>
      </div>
      <div className='invoice-products-header'>
        <div className='i-title'>
          <h3>NO.</h3>
        </div>
        <div className='i-title'>
          <h3>TOUR </h3>
        </div>
        <div className='i-title'>
          <h3>PRICE</h3>
        </div>
        <div className='i-title'>
          <h3>TOTAL</h3>
        </div>
      </div>
      <div className='invoice-products-items'>
        <div>e</div>
        <div>b</div>
        <div>c</div>
        <div>e</div>
      </div>
      <div className='header-invoice conditions'>
        <div className='tcS'>
        <h3>Terms & Conditions</h3>
        <h5>By accepting this invoice, 
          you agree to the terms and conditions 
          outlined in our invoice policy.</h5>
        </div>
        <div className='p-method'>
          <div>
            <h3>SubTotal</h3>
            <h3>Discount</h3>
            <h3>Tax(10%)</h3>
            <h2>Total Amount</h2>
          </div>
          <div>
            <h3>$ 100</h3>
            <h3>$ 100</h3>
            <h3>$ 10</h3>
            <h2>$ 100</h2>
          </div>
        </div>  
      </div>
      <div className='Thankyou'>
        <div>
          <h3>That you for Doing Business with Us</h3>
        </div>
        <div>b</div>
      </div>
      <div className='last-part'>
        <h3>Tours and travel $year </h3>
      </div>
    </div>
    </>
    
  );
};

export default Invoice;
