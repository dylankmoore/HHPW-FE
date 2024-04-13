import React from 'react';
import { useRouter } from 'next/router';
import UpdateOrderForm from '../../../components/forms/UpdateOrderForm';

const EditOrderPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {id ? <UpdateOrderForm /> : <p>Loading...</p>}
    </div>
  );
};

export default EditOrderPage;
