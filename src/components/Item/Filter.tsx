import SearchIcon from '@mui/icons-material/SearchOffOutlined';
import { Select } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { filterState } from '@atoms/item';

const Filter = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  const handleInputChange = (event) => {
    console.log('handleInputChange => ', event.target.value);
    setFilter({ ...filter, search: event.target.value });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          value={filter.search}
          onChange={handleInputChange}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <SearchIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* {renderFilters()} */}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for item</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
            value={filter.search}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by status"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="refunded">Refunded</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Category</FormLabel>
          <Select size="sm" placeholder="All">
            <Option value="all">All</Option>
            <Option value="refund">Refund</Option>
            <Option value="purchase">Purchase</Option>
            <Option value="debit">Debit</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Customer</FormLabel>
          <Select size="sm" placeholder="All">
            <Option value="all">All</Option>
            <Option value="olivia">Olivia Rhye</Option>
            <Option value="steve">Steve Hampton</Option>
            <Option value="ciaran">Ciaran Murray</Option>
            <Option value="marina">Marina Macdonald</Option>
            <Option value="charles">Charles Fulton</Option>
            <Option value="jay">Jay Hoper</Option>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Filter;
