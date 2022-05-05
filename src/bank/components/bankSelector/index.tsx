import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldArrayRenderProps } from 'formik/dist/FieldArray';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { fetchBanks } from '../../services/bank.service';
import { openNotification } from '../../../notification/redux/notificationSlice';
import { Bank } from '../../interfaces/bank';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface BankSelectorProps {
  labelText: string;
  name: string;
  banksSelected: number[];
  arrayHelper: FieldArrayRenderProps;
}

const BankSelector = ({
  banksSelected,
  name,
  arrayHelper,
  labelText,
}: BankSelectorProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBanksWrapper = async () => {
      try {
        setLoading(true);
        const response = await fetchBanks();
        setBanks(response.data);
        setLoading(false);
      } catch (error) {
        openNotification({
          severity: 'error',
          message: 'Error retrieving banks',
        });
        setLoading(false);
      }
    };
    fetchBanksWrapper();
  }, []);

  const handleCheckBoxChange = (bankId: number, isChecked: boolean) => {
    if (isChecked) {
      const index = banksSelected.indexOf(bankId);
      arrayHelper.remove(index);
      return;
    }
    arrayHelper.insert(bankId, bankId);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={`${name}-label`}>{labelText}</InputLabel>
      <Select
        labelId={`${name}-label`}
        multiple
        value={banksSelected}
        renderValue={(selected) =>
          banks
            .filter((bank) => selected.includes(bank.id))
            .map((bank) => bank.name)
            .join(',')
        }
        input={<OutlinedInput label={labelText} />}
        MenuProps={MenuProps}
      >
        {loading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          banks.map((bank) => (
            <MenuItem key={bank.name} value={bank.name}>
              <Checkbox
                name={`${name}.${bank.id}`}
                onChange={() =>
                  handleCheckBoxChange(
                    bank.id,
                    banksSelected.indexOf(bank.id) > -1,
                  )
                }
                checked={banksSelected.indexOf(bank.id) > -1}
              />
              <ListItemText primary={bank.name} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default BankSelector;
