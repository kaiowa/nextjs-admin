import Header from'../components/header/header';
import { NextSeo } from 'next-seo';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
// import people from '../data/data';
import RegisterForm from '../components/registerform/registerform';

const SignUp = () => {

  return (
    <div className="container">
      <RegisterForm></RegisterForm>
      <style jsx global>{`
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
    }
    main {
      padding: 5rem 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

  `}</style>
    </div>
  

)}

export default SignUp