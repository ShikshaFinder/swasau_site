import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function page() {

    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

  return (
    <div>
      <h1>Lander</h1>
    </div>
  )
}

export default page
