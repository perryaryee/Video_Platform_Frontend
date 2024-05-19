import React, { useState } from 'react'
import { AuthHeader } from '../Components/AuthHeader'

const ResetPassword: React.FC = () => {
  const [email, setemail] = useState<string>("");
  return (
    <div>
      <AuthHeader />
      <div className=' grid place-items-center'>

        <div>

        </div>

      </div>
    </div>
  )
}

export default ResetPassword