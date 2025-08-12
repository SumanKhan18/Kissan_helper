import PropTypes from 'prop-types';
import { Check, AlertCircle } from 'lucide-react';

function UserPlans({ user }) {
  const plans = [
    {
      name: 'Basic',
      price: '₹499',
      period: 'month',
      features: [
        'Basic transaction tracking',
        'Up to 100 notes',
        'Email support',
        'Basic analytics'
      ],
      current: user.currentPlan === 'Basic'
    },
    {
      name: 'Premium',
      price: '₹999',
      period: 'month',
      features: [
        'Advanced transaction tracking',
        'Unlimited notes',
        'Priority support',
        'Advanced analytics',
        'Custom categories',
        'Data export'
      ],
      current: user.currentPlan === 'Premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹1999',
      period: 'month',
      features: [
        'Everything in Premium',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Team collaboration',
        'Custom integrations'
      ],
      current: user.currentPlan === 'Enterprise'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">Subscription Plans</h1>
        <p className="text-gray-500">Choose the perfect plan for your needs</p>
      </div>

      {/* Current Plan Alert */}
      <div className="mb-8 bg-gray-900 border border-blue-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-500">
            Your current plan: {user.currentPlan}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Valid until {user.planExpiry}
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-gray-900 hover:bg-gray-800 rounded-lg shadow-sm border ${
              plan.current ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-600">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-green-500">{plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${
                  plan.current
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-gray-500'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-green-600 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6">
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-green-600">
              Can I change my plan later?
            </h3>
            <p className="mt-2 text-gray-400">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-green-600">
              What happens to my data if I downgrade?
            </h3>
            <p className="mt-2 text-gray-400">
              Your data will be preserved, but you may lose access to certain features. We'll notify you of any changes before the downgrade takes effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

UserPlans.propTypes = {
  user: PropTypes.shape({
    currentPlan: PropTypes.string.isRequired,
    planExpiry: PropTypes.string.isRequired
  }).isRequired
};

export default UserPlans;