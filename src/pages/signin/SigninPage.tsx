import { SigninForm } from "./SigninForm";
import {UserLayout} from '../../layouts/userLayout';

export const SigninPage: React.FC = () => {


   return (
       <UserLayout>
           <SigninForm></SigninForm>
       </UserLayout>
   )
};

