// import React from 'react';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
//   Box,
//   CircularProgress,
//   TablePagination,
//   Container
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { format } from 'date-fns';

// // Styled components
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   fontWeight: 'bold',
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.common.white,
// }));

// export default function PaymentDetails() {
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const result = await Axios.get(`http://localhost:8083/payment`);
//             console.log('Payment Data:', result.data);
//             setPayments(result.data);
//         } catch (error) {
//             console.error('Error fetching payments:', error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom color="primary">
//                 Payment List
//             </Typography>

//             <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
//                 {payments.length > 0 ? (
//                     <>
//                         <TableContainer sx={{ maxHeight: 440 }}>
//                             <Table stickyHeader aria-label="payment table">
//                                 <TableHead>
//                                     <TableRow>
//                                         <StyledTableCell>Payment ID</StyledTableCell>
//                                         <StyledTableCell>Status</StyledTableCell>
//                                         <StyledTableCell>Payment Date</StyledTableCell>
//                                         <StyledTableCell>Amount</StyledTableCell>
//                                         <StyledTableCell>User ID</StyledTableCell>
//                                         <StyledTableCell>Turf ID</StyledTableCell>
//                                         <StyledTableCell>Booking ID</StyledTableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {payments
//                                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                         .map((payment) => (
//                                         <TableRow 
//                                             key={payment.id}
//                                             hover
//                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                         >
//                                             <TableCell>{payment.id}</TableCell>
//                                             <TableCell>
//                                                 <Chip
//                                                     label={payment.status}
//                                                     color={payment.status === 'SUCCESS' ? 'success' : 'error'}
//                                                     size="small"
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 {format(new Date(payment.paymentDate), 'dd MMM yyyy')}
//                                             </TableCell>
//                                             <TableCell>₹{payment.amount}</TableCell>
//                                             <TableCell>{payment.userId}</TableCell>
//                                             <TableCell>{payment.turfId}</TableCell>
//                                             <TableCell>{payment.bookingId}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25]}
//                             component="div"
//                             count={payments.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </>
//                 ) : (
//                     <Box p={3}>
//                         <Typography variant="h6" color="text.secondary" align="center">
//                             No Payment Records Available
//                         </Typography>
//                     </Box>
//                 )}
//             </Paper>
//         </Container>
//     );
// }



import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  CircularProgress,
  TablePagination,
  Container,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  AttachMoney,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
  },
}));

export default function PaymentDetails() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await Axios.get('http://localhost:8083/payment');
      console.log('API Response:', response.data); // Debug log
      setPayments(response.data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const searchLower = searchTerm.toLowerCase();
      const paymentIdMatch = payment.paymentId?.toString().toLowerCase().includes(searchLower);
      const userIdMatch = payment.userId?.toString().toLowerCase().includes(searchLower);
      const amountMatch = payment.paymentAmount?.toString().toLowerCase().includes(searchLower);

      const statusMatch = 
        statusFilter === 'all' || 
        payment.status?.toLowerCase() === statusFilter.toLowerCase();

      return (paymentIdMatch || userIdMatch || amountMatch) && statusMatch;
    });
  }, [payments, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      totalAmount: payments.reduce((sum, payment) => sum + (Number(payment.paymentAmount) || 0), 0),
      successCount: payments.filter(payment => payment.status === 'SUCCESS').length,
      todayCount: payments.filter(payment => {
        if (!payment.paymentDate) return false;
        const paymentDate = format(new Date(payment.paymentDate), 'yyyy-MM-dd');
        const today = format(new Date(), 'yyyy-MM-dd');
        return paymentDate === today;
      }).length
    };
  }, [payments]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4 }}>
        Payment Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <AttachMoney color="primary" />
                <Typography color="textSecondary">Total Revenue</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                ₹{stats.totalAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatsCard>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle color="success" />
                <Typography color="textSecondary">Successful Payments</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                {stats.successCount}
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatsCard>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Schedule color="primary" />
                <Typography color="textSecondary">Today's Payments</Typography>
              </Box>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                {stats.todayCount}
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <SearchBar
          size="small"
          placeholder="Search by ID, User, or Amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <Tooltip title="Filter Status">
          <IconButton onClick={() => setStatusFilter(statusFilter === 'all' ? 'SUCCESS' : 'all')}>
            <FilterList color={statusFilter !== 'all' ? 'primary' : 'inherit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Refresh">
          <IconButton onClick={fetchPayments}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Payments Table */}
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        {filteredPayments.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Payment ID</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Payment Date</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell>Turf ID</StyledTableCell>
                    <StyledTableCell>Booking ID</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((payment) => (
                      <TableRow 
                        key={payment.paymentId}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{payment.paymentId}</TableCell>
                        <TableCell>
                          <Chip
                            label={payment.status || 'PENDING'}
                            color={payment.status === 'SUCCESS' ? 'success' : 'error'}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell>
                          {payment.paymentDate ? 
                            format(new Date(payment.paymentDate), 'dd MMM yyyy') :
                            'N/A'
                          }
                        </TableCell>
                        <TableCell>₹{Number(payment.paymentAmount).toLocaleString()}</TableCell>
                        <TableCell>{payment.userId}</TableCell>
                        <TableCell>{payment.turfId}</TableCell>
                        <TableCell>{payment.bookingId}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPayments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </>
        ) : (
          <Box p={3}>
            <Typography variant="h6" color="text.secondary" align="center">
              No Payment Records Found
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}