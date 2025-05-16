const {
  loan_applications,
  comakers,
  makers,
  loan_amortizations,
  loan_insurances, 
  staff_logs
} = require('../models');
const dayjs = require('dayjs');

// Utility function to calculate amortization schedule
const generateAmortizationSchedule = ({ loanAmount, termMonths, interestRate }) => {
  const monthlyRate = interestRate / 100 / 12;
  const amortization = [];

  const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths));
  let remainingBalance = loanAmount;

  for (let i = 1; i <= termMonths; i++) {
    const interest = remainingBalance * monthlyRate;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    amortization.push({
      installment_no: i,
      due_date: dayjs().add(i, 'month').format('YYYY-MM-DD'),
      principal: principal.toFixed(2),
      interest: interest.toFixed(2),
      total_payment: monthlyPayment.toFixed(2),
      remaining_balance: remainingBalance > 0 ? remainingBalance.toFixed(2) : '0.00'
    });
  }

  return amortization;
};

// Create Loan
const createLoan = async (req, res) => {
  const userId  = req.user.id;
  try {
    const loan = await loan_applications.create(req.body);

    // Auto-generate amortization
    const amortizationSchedule = generateAmortizationSchedule({
      loanAmount: parseFloat(loan.applied_amount),
      termMonths: loan.loan_term,
      interestRate: 12  // Adjust as needed
    });

    const amortizationRecords = amortizationSchedule.map(item => ({
      loan_id: loan.id,
      ...item
    }));

    await loan_amortizations.bulkCreate(amortizationRecords);
    await staff_logs.create({ user_id: userId, action: 'create loan'});

    res.status(201).json({ loan, amortizationSchedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Loan creation failed', error: err });
  }
};

// Read All Loans
const getAllLoans = async (req, res) => {
  try {
    const loans = await loan_applications.findAll({
      include: [makers, comakers, loan_amortizations, loan_insurances]
    });
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching loans', error: err });
  }
};

// Get One Loan
const getLoanById = async (req, res) => {
  try {
    const loan = await loan_applications.findByPk(req.params.id, {
      include: [makers, comakers, loan_amortizations, loan_insurances]
    });

    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving loan', error: err });
  }
};

// Update Loan
const updateLoan = async (req, res) => {
  try {
    const loan = await loan_applications.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    await loan.update(req.body);
    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error updating loan', error: err });
  }
};

// Delete Loan
const deleteLoan = async (req, res) => {
  try {
    const loan = await loan_applications.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    await loan.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting loan', error: err });
  }
};

// Approve Loan
const approveLoan = async (req, res) => {
  try {
    const loan = await loan_applications.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    await loan.update({ status: 'approved' });

    const amortizationSchedule = generateAmortizationSchedule({
      loanAmount: parseFloat(loan.applied_amount),
      termMonths: loan.loan_term,
      interestRate: 12 // Adjust rate as needed
    });

    const amortizationRecords = amortizationSchedule.map(item => ({
      loan_id: loan.id,
      ...item
    }));

    await loan_amortizations.bulkCreate(amortizationRecords);

    res.status(200).json({ message: 'Loan approved', amortizationSchedule });
  } catch (err) {
    res.status(500).json({ message: 'Error approving loan', error: err });
  }
};

// Decline Loan
const declineLoan = async (req, res) => {
  try {
    const loan = await loan_applications.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    await loan.update({ status: 'declined' });
    res.status(200).json({ message: 'Loan declined' });
  } catch (err) {
    res.status(500).json({ message: 'Error declining loan', error: err });
  }
};

// Export controller functions
module.exports = {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  approveLoan,
  declineLoan
};
