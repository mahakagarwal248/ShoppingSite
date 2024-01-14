import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

function TableComp({ data, columns, rowKeys }) {
  const navigate = useNavigate();
  const handleClick = (product) => {
    navigate(`/productDetails/${product?._id}`, { state: product?.productId });
  };
  let image = {};

  const getValueByPath = (obj, path) => {
    const properties = path.split('.');

    return properties.reduce((acc, prop) => {
      if (acc && typeof acc === 'object' && prop in acc) {
        return acc[prop];
      } else {
        return undefined;
      }
    }, obj);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="wishlist-table-head">
            <TableRow>
              {columns?.map((heading, index) => (
                <TableCell key={index} className="wishlist-table-head-cell">
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="wishlist-table-body">
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {data.map((item) => {
                return rowKeys.map((key, index) => {
                  const keyVal = getValueByPath(item, key);
                  key.includes('img')
                    ? (image = `data:${keyVal.contentType};base64, ${keyVal.data}`)
                    : '';
                  return (
                    <TableCell
                      key={index}
                      component="th"
                      scope="row"
                      onClick={() => handleClick(item)}>
                      {key.includes('img') ? (
                        <img
                          src={image}
                          alt="product"
                          style={{ height: '70px', width: '70px', cursor: 'pointer' }}
                        />
                      ) : (
                        keyVal
                      )}
                    </TableCell>
                  );
                });
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComp;
