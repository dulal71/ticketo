import RegistrationForm from "@/components/auth/RegistrationForm";
import { Suspense } from "react";


export default function SignupPage() {
   return (
      <Suspense fallback={<div>loading</div>}>
          <RegistrationForm></RegistrationForm>
        </Suspense>
       );
}