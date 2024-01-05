import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/20/solid';

export const AlertVariants = {
  error: {
    backgroundColor: 'bg-red-50',
    iconColor: 'text-red-400',
    textColor: 'text-red-800',
    titeColor: 'text-red-800',
    titleText: 'Error',
  },
  success: {
    backgroundColor: 'bg-green-50',
    iconColor: 'text-green-400',
    textColor: 'text-green-800',
    titeColor: 'text-green-800',
    titleText: 'Success',
  },
};

export default function AlertBox({ variant, children }) {
  return (
    <div className={`rounded-md ${variant.backgroundColor} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {variant === AlertVariants.error ? (
            <ExclamationTriangleIcon
              className={`h-5 w-5 ${variant.iconColor}`}
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${variant.titeColor}`}>
            {variant.titleText}
          </h3>
          <div className={`mt-2 text-sm ${variant.textColor}`}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
