import { useMsal } from '@azure/msal-react';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { createApiRequest, updateApiRequest } from '@/api/item';
import { notificationState } from '@atoms/notification';

import { IFormData, IFormProps } from './types';

export const initialState = {
  code: '',
  name: '',
  description: '',
  uom: '',
  anvisaCode: '',
  anvisaDueDate: null,
  supplierCode: '',
  cst: '',
  susCode: '',
  ncmCode: '',
  salesName: '',
};

export const Form = ({ initialData, open, handleClose }: IFormProps) => {
  const { instance, accounts } = useMsal();
  const [formData, setFormData] = useState<IFormData>(
    initialData || initialState,
  );
  const setNotification = useSetRecoilState(notificationState);

  useEffect(() => {
    setFormData({ ...formData, ...initialData });
  }, [initialData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDateChange = (newValue: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      anvisaDueDate: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log('handleSubmit ===> ', {
      event,
      initialData,
      res: !!initialData,
    });

    const isUpdating = !!initialData; // Verifica se é atualização

    try {
      const result = await (isUpdating
        ? updateApiRequest({
            instance,
            accounts,
            model: 'items',
            body: formData,
            id: initialData?.code,
          })
        : createApiRequest({
            instance,
            accounts,
            model: 'items',
            body: formData,
          }));

      console.log('result => ', result);

      if (result.message === 'Item was updated successfully.') {
        handleClose();
        setNotification(
          `Item: ${isUpdating && initialData.code} ${isUpdating ? 'atualizado' : 'criado'} com sucesso`,
        );
      } else {
        handleClose();
        setNotification(
          `Item: '${result.code}' nao foi ${isUpdating ? 'atualizado!' : 'criado'}`,
        );
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      handleClose();
      setNotification(
        `Item: '${result.code}' nao foi ${isUpdating ? 'atualizado!' : 'criado'}`,
      );
    }
  };

  const renderForm = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {[
            'name',
            'code',
            'description',
            'uom',
            'anvisaCode',
            'supplierCode',
            'cst',
            'susCode',
            'ncmCode',
            'salesName',
          ].map((field) => (
            <Input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              color="primary"
              size="md"
              variant="soft"
              fullWidth
            />
          ))}
          {/* <DatePicker
            format="MM/dd/yyyy"
            value={formData.anvisaDueDate}
            onChange={handleDateChange}
            renderInput={(params) => <Input {...params} fullWidth />}
          /> */}
          <Button type="submit">Enviar</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog
        sx={{ width: '500px' }} // Definindo um tamanho maior para o modal
        color="primary"
        variant="plain"
      >
        <ModalClose />
        <DialogTitle>Criar Novo Item</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>{renderForm()}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default Form;
