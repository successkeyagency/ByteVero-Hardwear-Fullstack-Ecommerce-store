import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const data: ContactItemData[] = [
    {
        title: "Visit Us",
        subtitle: "St. Luis MO",
        icon: (
            <MapPin className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors' />
        ),
    },
    {
        title: "Call Us",
        subtitle: "+16 934 678 901",
        icon: (
            <Phone className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors' />
        ),

    },
    {
        title: "Office Hours",
        subtitle: "Mon-sat: 7:00 Am - 5:00 pm",
        icon: (
            <Clock className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors' />
        ),

    },
    {
        title: "Email Us",
        subtitle: "contact@successkeyagency.com",
        icon: (
            <Mail className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors' />
        ),

    },
]
const AfterHomeVid = () => {
    return (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b pb-8">
  {data?.map((item, index) => (
    <div
      key={index}
      className="flex items-start gap-4 p-6 bg  border-gray-800 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
    >
      <div className="text-amber-500 text-3xl">{item?.icon}</div>
      <div>
        <h1 className="text-black font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">
          {item?.title}
        </h1>
        <p className="text-gray-900 text-sm">{item?.subtitle}</p>
      </div>
    </div>
  ))}
</div>

    );
  };
  

export default AfterHomeVid