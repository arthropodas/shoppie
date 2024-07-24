import React from 'react';
import Swal,{SweetAlertIcon} from 'sweetalert2';

interface SweetAlertProps {
  title: string;
  
  icon: SweetAlertIcon;
}

export const SweetAlert: React.FC<SweetAlertProps> = ({title,  icon }) => {
  
    console.log(icon);
    
  Swal.fire({
    title: title,
  
    icon: icon,
    showConfirmButton:false,
    timer:1000
  });

  return null;
};
