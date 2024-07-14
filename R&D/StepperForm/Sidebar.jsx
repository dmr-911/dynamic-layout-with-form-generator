import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = ({ steps, formData, step }) => {
  const router = useRouter();
  //   const { step = 1 } = router.query;

  return (
    <div className="w-1/6 bg-gray-200 p-4 h-[50vh] bg-white rounded-md border-2">
      <ul>
        {steps.map((item, index) => {
          const isActive = Number(step) >= item.step;
          return (
            <li
              key={index}
              className={`mb-2 px-2 ${Number(step) === item.step ? 'font-bold bg-primary-200 rounded-md' : ''}`}
            >
              {isActive ? (
                <Link href={`/form?step=${item.step}`}>
                  <span className="text-blue-600">{item.label}</span>
                </Link>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
