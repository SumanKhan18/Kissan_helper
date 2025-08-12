// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, User, Phone, MapPin, CreditCard, Upload, CheckCircle, Clock, Check, X } from 'lucide-react';

// import { uploadFile, saveAdminRegistration } from '../firebase';
// import { initializeRazorpay, processPayment } from '../services/razorpay';
// import { sendOTPEmail, sendRegistrationEmail } from '../services/emailjs';
// import { AdminRegistration } from '../types/admin';

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//     aadhaarNumber: '',
//     otp: '',
//     aadhaarImage: null as File | null,
//     applicantImage: null as File | null
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [dragActive, setDragActive] = useState({ aadhaar: false, applicant: false });

//   // OTP related state
//   const [otpState, setOtpState] = useState({
//     isOtpSent: false,
//     isOtpVerified: false,
//     otpLoading: false,
//     generatedOtp: '',
//     otpTimer: 0,
//     canResend: true
//   });

//   const navigate = useNavigate();

//   // OTP Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (otpState.otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpState(prev => ({
//           ...prev,
//           otpTimer: prev.otpTimer - 1,
//           canResend: prev.otpTimer <= 1
//         }));
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpState.otpTimer]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const generateOTP = (): string => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       alert('Please enter your email address first');
//       return;
//     }

//     if (!formData.fullName) {
//       alert('Please enter your full name first');
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert('Please enter a valid email address');
//       return;
//     }
//     setOtpState(prev => ({ ...prev, otpLoading: true }));

//     try {
//       const otp = generateOTP();
//       console.log('Generated OTP:', otp);
//       console.log('Sending to email:', formData.email);
//       console.log('Full name:', formData.fullName);

//       const success = await sendOTPEmail(formData.email, otp, formData.fullName);

//       if (success) {
//         setOtpState(prev => ({
//           ...prev,
//           isOtpSent: true,
//           generatedOtp: otp,
//           otpTimer: 60,
//           canResend: false,
//           otpLoading: false
//         }));
//         alert(`OTP sent successfully to ${formData.email}! Please check your email (including spam folder).`);
//       } else {
//         throw new Error('Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert(`Failed to send OTP to ${formData.email}. Please check your email address and try again. Error: ${error.message || 'Unknown error'}`);
//       setOtpState(prev => ({ ...prev, otpLoading: false }));
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!otpState.canResend) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = () => {
//     if (!formData.otp) {
//       alert('Please enter the OTP');
//       return;
//     }

//     if (formData.otp === otpState.generatedOtp) {
//       setOtpState(prev => ({ ...prev, isOtpVerified: true }));
//       alert('OTP verified successfully!');
//     } else {
//       alert('Invalid OTP. Please try again.');
//     }
//   };

//   const handleFileUpload = (field: 'aadhaarImage' | 'applicantImage', file: File) => {
//     if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
//       setFormData(prev => ({ ...prev, [field]: file }));
//     }
//   };

//   const handleDrag = (e: React.DragEvent, field: 'aadhaar' | 'applicant') => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(prev => ({ ...prev, [field]: true }));
//     } else if (e.type === 'dragleave') {
//       setDragActive(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const handleDrop = (e: React.DragEvent, field: 'aadhaarImage' | 'applicantImage') => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(prev => ({
//       ...prev,
//       [field === 'aadhaarImage' ? 'aadhaar' : 'applicant']: false
//     }));
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(field, e.dataTransfer.files[0]);
//     }
//   };

//   const validateAadhaar = (aadhaar: string) => {
//     const aadhaarRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
//     return aadhaarRegex.test(aadhaar.replace(/\s/g, ''));
//   };

//   const validatePhone = (phone: string) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone);
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const razorpayLoaded = await initializeRazorpay();
//       if (!razorpayLoaded) throw new Error('Payment system failed to load');

//       const paymentResponse = await processPayment(
//         formData.email,
//         formData.phoneNumber,
//         formData.fullName
//       );

//       const registrationData: AdminRegistration = {
//         fullName: formData.fullName,
//         phoneNumber: formData.phoneNumber,
//         email: formData.email,
//         aadhaarNumber: formData.aadhaarNumber,
//         aadhaarImageUrl: '',
//         adminPhotoUrl: '',
//         adminId: 'null',
//         adminPassword: 'null',
//         address: formData.address,
//         paymentId: paymentResponse.razorpay_payment_id,
//         paymentStatus: 'completed',
//         registrationDate: new Date(),
//         approvalStatus: 'pending',
//         emailVerified: true, // OTP verified
//         otp: otpState.generatedOtp,
//         otpCreatedAt: new Date().toISOString()
//       };

//       const registrationId = await saveAdminRegistration(registrationData);

//       // Send registration confirmation email
//       await sendRegistrationEmail(formData.email, formData.fullName, registrationId);

//       alert(`Registration successful!\n\nRegistration ID: ${registrationId}\nYou will receive your admin credentials after approval.\n\nRedirecting to login page...`);
//       setSubmitted(true);

//       setTimeout(() => {
//         navigate('/Login');
//       }, 2000);

//       // Background file upload
//       (async () => {
//         try {
//           let aadhaarImageUrl = '';
//           let applicantImageUrl = '';

//           if (formData.aadhaarImage) {
//             aadhaarImageUrl = await uploadFile(formData.aadhaarImage, 'aadhaar');
//           }
//           if (formData.applicantImage) {
//             applicantImageUrl = await uploadFile(formData.applicantImage, 'admin-photos');
//           }

//           await saveAdminRegistration({
//             ...registrationData,
//             aadhaarImageUrl,
//             adminPhotoUrl: applicantImageUrl
//           });

//           console.log('✅ Background image upload complete.');
//         } catch (uploadErr) {
//           console.warn('⚠️ Background upload failed. Manual review needed.', uploadErr);
//         }
//       })();
//     } catch (err: any) {
//       console.error('Registration Error:', err);
//       alert(err.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otpState.isOtpVerified) {
//       alert('Please verify your email with OTP first');
//       return;
//     }

//     if (!validateAadhaar(formData.aadhaarNumber)) {
//       alert('Please enter a valid Aadhaar number');
//       return;
//     }

//     if (!validatePhone(formData.phoneNumber)) {
//       alert('Please enter a valid phone number');
//       return;
//     }

//     if (!formData.aadhaarImage || !formData.applicantImage) {
//       alert('Please upload both Aadhaar card and your photo');
//       return;
//     }

//     await handlePayment();
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white p-8 rounded shadow-md">
//           <div className="text-center">
//             <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
//             <h2 className="text-xl font-bold mt-4">Registration Submitted!</h2>
//             <p className="text-gray-600 mt-2">
//               You will receive your admin credentials after approval.
//             </p>
//             <Link
//               to="/"
//               className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Go to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
//       <div className="max-w-2xl w-full">
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000 mt-6">
//           <div className="text-center mb-8">
//             <Link to="/Register" className="inline-flex items-center space-x-2 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold">K</span>
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
//                 KissanHelper
//               </span>
//             </Link>
//             <h2 className="text-3xl font-bold text-white mb-2">Admin Registration</h2>
//             <p className="text-slate-400">Apply for admin access - Manual approval required</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   required
//                   placeholder="Full Name *"
//                   value={formData.fullName}
//                   onChange={(e) => handleInputChange('fullName', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="tel"
//                   required
//                   placeholder="Phone Number *"
//                   value={formData.phoneNumber}
//                   onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>
//             </div>

//             {/* Email with OTP */}
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   placeholder="Email Address *"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
//                   {!otpState.isOtpSent ? (
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={otpState.otpLoading}
//                       className="text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
//                     >
//                       {otpState.otpLoading ? 'Sending...' : 'Send OTP'}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={!otpState.canResend || otpState.otpLoading}
//                       className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
//                     >
//                       {otpState.otpLoading ? (
//                         'Sending...'
//                       ) : otpState.canResend ? (
//                         'Resend'
//                       ) : (
//                         <>
//                           <Clock className="w-3 h-3" />
//                           {otpState.otpTimer}s
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* OTP Input Section */}
//               {otpState.isOtpSent && (
//                 <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-emerald-400" />
//                     <span className="text-sm text-slate-300">
//                       OTP sent to {formData.email}
//                     </span>
//                     {otpState.isOtpVerified && (
//                       <Check className="w-4 h-4 text-green-400" />
//                     )}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <input
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       maxLength={6}
//                       value={formData.otp}
//                       onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
//                       className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       disabled={otpState.isOtpVerified}
//                     />

//                     {!otpState.isOtpVerified ? (
//                       <button
//                         type="button"
//                         onClick={handleVerifyOtp}
//                         disabled={formData.otp.length !== 6}
//                         className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
//                       >
//                         Verify
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2 text-green-400 font-semibold">
//                         <Check className="w-5 h-5" />
//                         Verified
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Address */}
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
//               <textarea
//                 required
//                 placeholder="Complete Address *"
//                 value={formData.address}
//                 onChange={(e) => handleInputChange('address', e.target.value)}
//                 rows={3}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
//               />
//             </div>

//             {/* Aadhaar Input */}
//             <div className="relative">
//               <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 required
//                 placeholder="Aadhaar Card Number (XXXX XXXX XXXX) *"
//                 value={formData.aadhaarNumber}
//                 onChange={(e) => {
//                   let value = e.target.value.replace(/\D/g, '');
//                   value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
//                   if (value.length <= 14) {
//                     handleInputChange('aadhaarNumber', value);
//                   }
//                 }}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Aadhaar and Photo Upload */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Aadhaar Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar Card Image *</label>
//                 <div
//                   className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.aadhaar ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
//                   onDragEnter={(e) => handleDrag(e, 'aadhaar')}
//                   onDragLeave={(e) => handleDrag(e, 'aadhaar')}
//                   onDragOver={(e) => handleDrag(e, 'aadhaar')}
//                   onDrop={(e) => handleDrop(e, 'aadhaarImage')}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*,.pdf"
//                     onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarImage', e.target.files[0])}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//                   {formData.aadhaarImage ? (
//                     <p className="text-emerald-400 text-sm font-medium">{formData.aadhaarImage.name}</p>
//                   ) : (
//                     <p className="text-slate-400 text-sm">Drop Aadhaar card here or click to upload</p>
//                   )}
//                 </div>
//               </div>

//               {/* Photo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Your Photo *</label>
//                 <div
//                   className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.applicant ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
//                   onDragEnter={(e) => handleDrag(e, 'applicant')}
//                   onDragLeave={(e) => handleDrag(e, 'applicant')}
//                   onDragOver={(e) => handleDrag(e, 'applicant')}
//                   onDrop={(e) => handleDrop(e, 'applicantImage')}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => e.target.files?.[0] && handleFileUpload('applicantImage', e.target.files[0])}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//                   {formData.applicantImage ? (
//                     <p className="text-emerald-400 text-sm font-medium">{formData.applicantImage.name}</p>
//                   ) : (
//                     <p className="text-slate-400 text-sm">Drop your photo here or click to upload</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500"
//               />
//               <span className="ml-2 text-sm text-slate-400">
//                 I agree to the{' '}
//                 <Link to="#" className="text-emerald-400 hover:text-emerald-300">Terms and Conditions</Link> and understand that this registration requires manual approval.
//               </span>
//             </div>

//             {/* Notice */}
//             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
//               <h4 className="text-blue-400 font-semibold mb-2">Important Notice:</h4>
//               <ul className="text-blue-300 text-sm space-y-1">
//                 <li>• Your application will be manually reviewed</li>
//                 <li>• Admin credentials will be sent to your email after approval</li>
//                 <li>• Email verification with OTP is required</li>
//                 <li>• Payment is required to complete registration</li>
//                 <li>• If file upload fails, you can email documents manually</li>
//               </ul>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading || !otpState.isOtpVerified}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
//                 loading || !otpState.isOtpVerified
//                   ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105'
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                   </svg>
//                   Processing...
//                 </span>
//               ) : !otpState.isOtpVerified ? (
//                 'Verify Email First'
//               ) : (
//                 'Register & Pay ₹499'
//               )}
//             </button>

//             <div className="mt-8 text-center">
//               <p className="text-slate-400">
//                 Already have login credentials?{' '}
//                 <Link to="/Login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, User, Phone, MapPin, CreditCard, Upload, CheckCircle, Clock, Check, X } from 'lucide-react';

// import { uploadFile, saveAdminRegistration } from '../firebase';
// import { initializeRazorpay, processPayment } from '../services/razorpay';
// import { sendOTPEmail, sendRegistrationEmail } from '../services/emailjs';
// import { sendSMSOTP } from '../services/twilio';
// import { AdminRegistration } from '../types/admin';

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//     aadhaarNumber: '',
//     otp: '',
//     mobileOtp: '',
//     aadhaarImage: null as File | null,
//     applicantImage: null as File | null
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [dragActive, setDragActive] = useState({ aadhaar: false, applicant: false });

//   // OTP related state
//   const [otpState, setOtpState] = useState({
//     isOtpSent: false,
//     isOtpVerified: false,
//     otpLoading: false,
//     generatedOtp: '',
//     otpTimer: 0,
//     canResend: true
//   });

//   // Mobile OTP related state
//   const [mobileOtpState, setMobileOtpState] = useState({
//     isOtpSent: false,
//     isOtpVerified: false,
//     otpLoading: false,
//     generatedOtp: '',
//     otpTimer: 0,
//     canResend: true
//   });

//   const navigate = useNavigate();

//   // OTP Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (otpState.otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpState(prev => ({
//           ...prev,
//           otpTimer: prev.otpTimer - 1,
//           canResend: prev.otpTimer <= 1
//         }));
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpState.otpTimer]);

//   // Mobile OTP Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (mobileOtpState.otpTimer > 0) {
//       interval = setInterval(() => {
//         setMobileOtpState(prev => ({
//           ...prev,
//           otpTimer: prev.otpTimer - 1,
//           canResend: prev.otpTimer <= 1
//         }));
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [mobileOtpState.otpTimer]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const generateOTP = (): string => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       alert('Please enter your email address first');
//       return;
//     }

//     if (!formData.fullName) {
//       alert('Please enter your full name first');
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert('Please enter a valid email address');
//       return;
//     }
//     setOtpState(prev => ({ ...prev, otpLoading: true }));

//     try {
//       const otp = generateOTP();
//       console.log('Generated OTP:', otp);
//       console.log('Sending to email:', formData.email);
//       console.log('Full name:', formData.fullName);

//       const success = await sendOTPEmail(formData.email, otp, formData.fullName);

//       if (success) {
//         setOtpState(prev => ({
//           ...prev,
//           isOtpSent: true,
//           generatedOtp: otp,
//           otpTimer: 60,
//           canResend: false,
//           otpLoading: false
//         }));
//         alert(`OTP sent successfully to ${formData.email}! Please check your email (including spam folder).`);
//       } else {
//         throw new Error('Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert(`Failed to send OTP to ${formData.email}. Please check your email address and try again. Error: ${error.message || 'Unknown error'}`);
//       setOtpState(prev => ({ ...prev, otpLoading: false }));
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!otpState.canResend) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = () => {
//     if (!formData.otp) {
//       alert('Please enter the OTP');
//       return;
//     }

//     if (formData.otp === otpState.generatedOtp) {
//       setOtpState(prev => ({ ...prev, isOtpVerified: true }));
//       alert('OTP verified successfully!');
//     } else {
//       alert('Invalid OTP. Please try again.');
//     }
//   };

//   const handleSendMobileOtp = async () => {
//     if (!formData.phoneNumber) {
//       alert('Please enter your phone number first');
//       return;
//     }

//     if (!validatePhone(formData.phoneNumber)) {
//       alert('Please enter a valid phone number');
//       return;
//     }

//     setMobileOtpState(prev => ({ ...prev, otpLoading: true }));

//     try {
//       console.log('Sending SMS OTP to:', formData.phoneNumber);

//       const result = await sendSMSOTP(formData.phoneNumber);

//       if (result.success) {
//         setMobileOtpState(prev => ({
//           ...prev,
//           isOtpSent: true,
//           generatedOtp: result.otp || '',
//           otpTimer: 60,
//           canResend: false,
//           otpLoading: false
//         }));
//         alert(`SMS OTP sent successfully to ${formData.phoneNumber}! ${result.otp ? `(Demo OTP: ${result.otp})` : 'Please check your phone.'}`);
//       } else {
//         throw new Error(result.error || 'Failed to send SMS OTP');
//       }
//     } catch (error) {
//       console.error('Error sending Mobile OTP:', error);
//       alert(`Failed to send SMS OTP to ${formData.phoneNumber}. Error: ${error.message || 'Unknown error'}`);
//       setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
//     }
//   };

//   const handleResendMobileOtp = async () => {
//     if (!mobileOtpState.canResend) return;
//     await handleSendMobileOtp();
//   };

//   const handleVerifyMobileOtp = () => {
//     if (!formData.mobileOtp) {
//       alert('Please enter the mobile OTP');
//       return;
//     }

//     if (formData.mobileOtp === mobileOtpState.generatedOtp) {
//       setMobileOtpState(prev => ({ ...prev, isOtpVerified: true }));
//       alert('Mobile OTP verified successfully!');
//     } else {
//       alert('Invalid mobile OTP. Please try again.');
//     }
//   };

//   const handleFileUpload = (field: 'aadhaarImage' | 'applicantImage', file: File) => {
//     if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
//       setFormData(prev => ({ ...prev, [field]: file }));
//     }
//   };

//   const handleDrag = (e: React.DragEvent, field: 'aadhaar' | 'applicant') => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(prev => ({ ...prev, [field]: true }));
//     } else if (e.type === 'dragleave') {
//       setDragActive(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const handleDrop = (e: React.DragEvent, field: 'aadhaarImage' | 'applicantImage') => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(prev => ({
//       ...prev,
//       [field === 'aadhaarImage' ? 'aadhaar' : 'applicant']: false
//     }));
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(field, e.dataTransfer.files[0]);
//     }
//   };

//   const validateAadhaar = (aadhaar: string) => {
//     const aadhaarRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
//     return aadhaarRegex.test(aadhaar.replace(/\s/g, ''));
//   };

//   const validatePhone = (phone: string) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone);
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const razorpayLoaded = await initializeRazorpay();
//       if (!razorpayLoaded) throw new Error('Payment system failed to load');

//       const paymentResponse = await processPayment(
//         formData.email,
//         formData.phoneNumber,
//         formData.fullName
//       );

//       const registrationData: AdminRegistration = {
//         fullName: formData.fullName,
//         phoneNumber: formData.phoneNumber,
//         email: formData.email,
//         aadhaarNumber: formData.aadhaarNumber,
//         aadhaarImageUrl: '',
//         adminPhotoUrl: '',
//         adminId: 'null',
//         adminPassword: 'null',
//         address: formData.address,
//         paymentId: paymentResponse.razorpay_payment_id,
//         paymentStatus: 'completed',
//         registrationDate: new Date(),
//         approvalStatus: 'pending',
//         emailVerified: true, // OTP verified
//         otp: otpState.generatedOtp,
//         otpCreatedAt: new Date().toISOString()
//       };

//       const registrationId = await saveAdminRegistration(registrationData);

//       // Send registration confirmation email
//       await sendRegistrationEmail(formData.email, formData.fullName, registrationId);

//       alert(`Registration successful!\n\nRegistration ID: ${registrationId}\nYou will receive your admin credentials after approval.\n\nRedirecting to login page...`);
//       setSubmitted(true);

//       setTimeout(() => {
//         navigate('/Login');
//       }, 2000);

//       // Background file upload
//       (async () => {
//         try {
//           let aadhaarImageUrl = '';
//           let applicantImageUrl = '';

//           if (formData.aadhaarImage) {
//             aadhaarImageUrl = await uploadFile(formData.aadhaarImage, 'aadhaar');
//           }
//           if (formData.applicantImage) {
//             applicantImageUrl = await uploadFile(formData.applicantImage, 'admin-photos');
//           }

//           await saveAdminRegistration({
//             ...registrationData,
//             aadhaarImageUrl,
//             adminPhotoUrl: applicantImageUrl
//           });

//           console.log('✅ Background image upload complete.');
//         } catch (uploadErr) {
//           console.warn('⚠️ Background upload failed. Manual review needed.', uploadErr);
//         }
//       })();
//     } catch (err: any) {
//       console.error('Registration Error:', err);
//       alert(err.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otpState.isOtpVerified) {
//       alert('Please verify your email with OTP first');
//       return;
//     }

//     if (!mobileOtpState.isOtpVerified) {
//       alert('Please verify your mobile number with OTP first');
//       return;
//     }

//     if (!validateAadhaar(formData.aadhaarNumber)) {
//       alert('Please enter a valid Aadhaar number');
//       return;
//     }

//     if (!validatePhone(formData.phoneNumber)) {
//       alert('Please enter a valid phone number');
//       return;
//     }

//     if (!formData.aadhaarImage || !formData.applicantImage) {
//       alert('Please upload both Aadhaar card and your photo');
//       return;
//     }

//     await handlePayment();
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white p-8 rounded shadow-md">
//           <div className="text-center">
//             <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
//             <h2 className="text-xl font-bold mt-4">Registration Submitted!</h2>
//             <p className="text-gray-600 mt-2">
//               You will receive your admin credentials after approval.
//             </p>
//             <Link
//               to="/"
//               className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Go to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
//       <div className="max-w-2xl w-full">
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000 mt-6">
//           <div className="text-center mb-8">
//             <Link to="/Register" className="inline-flex items-center space-x-2 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold">K</span>
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
//                 KissanHelper
//               </span>
//             </Link>
//             <h2 className="text-3xl font-bold text-white mb-2">Admin Registration</h2>
//             <p className="text-slate-400">Apply for admin access - Manual approval required</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   required
//                   placeholder="Full Name *"
//                   value={formData.fullName}
//                   onChange={(e) => handleInputChange('fullName', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               {/* Phone Number with OTP */}
//               <div className="space-y-4">
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone Number *"
//                     value={formData.phoneNumber}
//                     onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                     className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                   <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
//                     {!mobileOtpState.isOtpSent ? (
//                       <button
//                         type="button"
//                         onClick={handleSendMobileOtp}
//                         disabled={mobileOtpState.otpLoading}
//                         className="text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
//                       >
//                         {mobileOtpState.otpLoading ? 'Sending...' : 'Send OTP'}
//                       </button>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleResendMobileOtp}
//                         disabled={!mobileOtpState.canResend || mobileOtpState.otpLoading}
//                         className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
//                       >
//                         {mobileOtpState.otpLoading ? (
//                           'Sending...'
//                         ) : mobileOtpState.canResend ? (
//                           'Resend'
//                         ) : (
//                           <>
//                             <Clock className="w-3 h-3" />
//                             {mobileOtpState.otpTimer}s
//                           </>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Mobile OTP Input Section */}
//                 {mobileOtpState.isOtpSent && (
//                   <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-4 h-4 text-emerald-400" />
//                       <span className="text-sm text-slate-300">
//                         OTP sent to {formData.phoneNumber}
//                       </span>
//                       {mobileOtpState.isOtpVerified && (
//                         <Check className="w-4 h-4 text-green-400" />
//                       )}
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <input
//                         type="text"
//                         placeholder="Enter 6-digit OTP"
//                         maxLength={6}
//                         value={formData.mobileOtp}
//                         onChange={(e) => handleInputChange('mobileOtp', e.target.value.replace(/\D/g, ''))}
//                         className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                         disabled={mobileOtpState.isOtpVerified}
//                       />

//                       {!mobileOtpState.isOtpVerified ? (
//                         <button
//                           type="button"
//                           onClick={handleVerifyMobileOtp}
//                           disabled={formData.mobileOtp?.length !== 6}
//                           className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
//                         >
//                           Verify
//                         </button>
//                       ) : (
//                         <div className="flex items-center gap-2 text-green-400 font-semibold">
//                           <Check className="w-5 h-5" />
//                           Verified
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Email with OTP */}
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   placeholder="Email Address *"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
//                   {!otpState.isOtpSent ? (
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={otpState.otpLoading}
//                       className="text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
//                     >
//                       {otpState.otpLoading ? 'Sending...' : 'Send OTP'}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={!otpState.canResend || otpState.otpLoading}
//                       className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
//                     >
//                       {otpState.otpLoading ? (
//                         'Sending...'
//                       ) : otpState.canResend ? (
//                         'Resend'
//                       ) : (
//                         <>
//                           <Clock className="w-3 h-3" />
//                           {otpState.otpTimer}s
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* OTP Input Section */}
//               {otpState.isOtpSent && (
//                 <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-emerald-400" />
//                     <span className="text-sm text-slate-300">
//                       OTP sent to {formData.email}
//                     </span>
//                     {otpState.isOtpVerified && (
//                       <Check className="w-4 h-4 text-green-400" />
//                     )}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <input
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       maxLength={6}
//                       value={formData.otp}
//                       onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
//                       className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       disabled={otpState.isOtpVerified}
//                     />

//                     {!otpState.isOtpVerified ? (
//                       <button
//                         type="button"
//                         onClick={handleVerifyOtp}
//                         disabled={formData.otp.length !== 6}
//                         className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
//                       >
//                         Verify
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2 text-green-400 font-semibold">
//                         <Check className="w-5 h-5" />
//                         Verified
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Address */}
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
//               <textarea
//                 required
//                 placeholder="Complete Address *"
//                 value={formData.address}
//                 onChange={(e) => handleInputChange('address', e.target.value)}
//                 rows={3}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
//               />
//             </div>

//             {/* Aadhaar Input */}
//             <div className="relative">
//               <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 required
//                 placeholder="Aadhaar Card Number (XXXX XXXX XXXX) *"
//                 value={formData.aadhaarNumber}
//                 onChange={(e) => {
//                   let value = e.target.value.replace(/\D/g, '');
//                   value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
//                   if (value.length <= 14) {
//                     handleInputChange('aadhaarNumber', value);
//                   }
//                 }}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Aadhaar and Photo Upload */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Aadhaar Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar Card Image *</label>
//                 <div
//                   className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.aadhaar ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
//                   onDragEnter={(e) => handleDrag(e, 'aadhaar')}
//                   onDragLeave={(e) => handleDrag(e, 'aadhaar')}
//                   onDragOver={(e) => handleDrag(e, 'aadhaar')}
//                   onDrop={(e) => handleDrop(e, 'aadhaarImage')}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*,.pdf"
//                     onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarImage', e.target.files[0])}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//                   {formData.aadhaarImage ? (
//                     <p className="text-emerald-400 text-sm font-medium">{formData.aadhaarImage.name}</p>
//                   ) : (
//                     <p className="text-slate-400 text-sm">Drop Aadhaar card here or click to upload</p>
//                   )}
//                 </div>
//               </div>

//               {/* Photo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Your Photo *</label>
//                 <div
//                   className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.applicant ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
//                   onDragEnter={(e) => handleDrag(e, 'applicant')}
//                   onDragLeave={(e) => handleDrag(e, 'applicant')}
//                   onDragOver={(e) => handleDrag(e, 'applicant')}
//                   onDrop={(e) => handleDrop(e, 'applicantImage')}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => e.target.files?.[0] && handleFileUpload('applicantImage', e.target.files[0])}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//                   {formData.applicantImage ? (
//                     <p className="text-emerald-400 text-sm font-medium">{formData.applicantImage.name}</p>
//                   ) : (
//                     <p className="text-slate-400 text-sm">Drop your photo here or click to upload</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500"
//               />
//               <span className="ml-2 text-sm text-slate-400">
//                 I agree to the{' '}
//                 <Link to="#" className="text-emerald-400 hover:text-emerald-300">Terms and Conditions</Link> and understand that this registration requires manual approval.
//               </span>
//             </div>

//             {/* Notice */}
//             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
//               <h4 className="text-blue-400 font-semibold mb-2">Important Notice:</h4>
//               <ul className="text-blue-300 text-sm space-y-1">
//                 <li>• Your application will be manually reviewed</li>
//                 <li>• Admin credentials will be sent to your email after approval</li>
//                 <li>• Email and mobile verification with OTP is required</li>
//                 <li>• Payment is required to complete registration</li>
//                 <li>• If file upload fails, you can email documents manually</li>
//               </ul>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
//                 loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified
//                   ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105'
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                   </svg>
//                   Processing...
//                 </span>
//               ) : !otpState.isOtpVerified || !mobileOtpState.isOtpVerified ? (
//                 'Verify Email & Mobile First'
//               ) : (
//                 'Register & Pay ₹499'
//               )}
//             </button>

//             <div className="mt-8 text-center">
//               <p className="text-slate-400">
//                 Already have login credentials?{' '}
//                 <Link to="/Login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;








//new code 
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Phone, MapPin, CreditCard, Upload, CheckCircle, Clock, Check, X } from 'lucide-react';
// import { uploadFile } from '../services/storage';
import { uploadFile, saveAdminRegistration } from '../firebase';
import { initializeRazorpay, processPayment } from '../services/razorpay';
import { sendOTPEmail , sendApplicationSuccessEmail } from '../services/emailjs';
import { sendSMSOTP, verifySMSOTP } from '../services/twilio';
import { sendRegistrationEmail } from '../services/email';
import { AdminRegistration } from "../types/admin";
// import { sendApplicationSuccessEmail } from '../services/registeremail';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    aadhaarNumber: '',
    otp: '',
    mobileOtp: '',
    aadhaarImage: null as File | null,
    applicantImage: null as File | null
  });

  const [captchaVerified, setCaptchaVerified] = useState(true);
 

  // Add handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const verifiedEmail = localStorage.getItem('verified_email');
      if (verifiedEmail) {
        alert('Please verify your email first');
        return;
      }
      await sendApplicationSuccessEmail(
        formData.fullName,
        verifiedEmail ?? "",
        formData.address,
        formData.phoneNumber,
        formData.aadhaarNumber
      );

      console.log("✅ Application success email sent.");
      alert("Registration successful and confirmation email sent!");
    } catch (err) {
      console.error("❌ Error in registration or email:", err);
      alert("Registration failed or email not sent.");
      return;
    }

    if (!captchaVerified) {
      alert('Please verify reCAPTCHA');
      return;
    }

    if (!otpState.isOtpVerified || !mobileOtpState.isOtpVerified) {
      alert('Please verify both email and mobile OTPs');
      return;
    }

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    if (!validateAadhaar(formData.aadhaarNumber)) {
      alert('Enter valid Aadhaar number');
      return;
    }

    if (!formData.aadhaarImage || !formData.applicantImage) {
      alert('Please upload Aadhaar and photo');
      return;
    }

    await handlePayment();
  };


  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState({ aadhaar: false, applicant: false });

  const [otpState, setOtpState] = useState({
    isOtpSent: false,
    isOtpVerified: false,
    otpLoading: false,
    generatedOtp: '',
    otpTimer: 0,
    canResend: true
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };
  const [mobileOtpState, setMobileOtpState] = useState({
    isOtpSent: false,
    isOtpVerified: false,
    otpLoading: false,
    generatedOtp: '',
    otpTimer: 0,
    canResend: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpState.otpTimer > 0) {
      interval = setInterval(() => {
        setOtpState(prev => ({
          ...prev,
          otpTimer: prev.otpTimer - 1,
          canResend: prev.otpTimer <= 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpState.otpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mobileOtpState.otpTimer > 0) {
      interval = setInterval(() => {
        setMobileOtpState(prev => ({
          ...prev,
          otpTimer: prev.otpTimer - 1,
          canResend: prev.otpTimer <= 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mobileOtpState.otpTimer]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async () => {
    if (!formData.email || !formData.fullName) {
      alert('Please enter full name and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email');
      return;
    }

    setOtpState(prev => ({ ...prev, otpLoading: true }));

    try {
      const otp = generateOTP();
      const success = await sendOTPEmail(formData.email, otp, formData.fullName);
      if (success) {
        setOtpState({
          ...otpState,
          isOtpSent: true,
          generatedOtp: otp,
          otpTimer: 60,
          canResend: false,
          otpLoading: false
        });
        alert(`OTP sent to ${formData.email}`);
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Email OTP Error:', error);
      alert(error.message || 'Failed to send OTP');
      setOtpState(prev => ({ ...prev, otpLoading: false }));
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp === otpState.generatedOtp) {
      setOtpState(prev => ({ ...prev, isOtpVerified: true }));
      alert('Email OTP verified!');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleSendMobileOtp = async () => {
    if (!validatePhone(formData.phoneNumber)) {
      alert('Enter a valid phone number');
      return;
    }

    setMobileOtpState(prev => ({ ...prev, otpLoading: true }));
    try {
      const result = await sendSMSOTP(formData.phoneNumber);
      if (result.success) {
        setMobileOtpState({
          ...mobileOtpState,
          isOtpSent: true,
          generatedOtp: '',
          otpTimer: 60,
          canResend: false,
          otpLoading: false
        });
        alert(`SMS OTP sent to ${formData.phoneNumber}`);
      } else {
        throw new Error(result.error || 'Failed to send SMS OTP');
      }
    } catch (error: any) {
      alert(error.message || 'SMS OTP failed');
      setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
    }
  };

  const handleVerifyMobileOtp = () => {
    if (!formData.mobileOtp) {
      alert('Enter the mobile OTP');
      return;
    }

    setMobileOtpState(prev => ({ ...prev, otpLoading: true }));
    verifySMSOTP(formData.phoneNumber, formData.mobileOtp)
      .then(result => {
        if (result.success) {
          setMobileOtpState(prev => ({ ...prev, isOtpVerified: true, otpLoading: false }));
          alert('Mobile OTP verified!');
        } else {
          alert(result.error || 'Invalid mobile OTP');
          setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
        }
      })
      .catch(err => {
        console.error(err);
        alert('Failed to verify mobile OTP');
        setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
      });
  };

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const validateAadhaar = (aadhaar: string) => /^\d{4}\s?\d{4}\s?\d{4}$/.test(aadhaar.replace(/\s/g, ''));

  const handleDrop = (e: React.DragEvent, field: 'aadhaarImage' | 'applicantImage') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({
      ...prev,
      [field === 'aadhaarImage' ? 'aadhaar' : 'applicant']: false
    }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(field, e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (field: 'aadhaarImage' | 'applicantImage', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      console.log(`✅ Base64 for ${field}:`, base64String);

      setFormData((prev) => ({
        ...prev,
        [field]: {
          name: file.name,
          file: file,
          base64: base64String,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(`📸 Base64 for ${file.name}:`, reader.result);
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const handlePayment = async () => {
    setLoading(true);
    try {
      const razorpayLoaded = await initializeRazorpay();
      if (!razorpayLoaded) throw new Error('Payment system failed to load');

      const paymentResponse = await processPayment(
        formData.email,
        formData.phoneNumber,
        formData.fullName
      );

      const registrationData: AdminRegistration = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        aadhaarNumber: formData.aadhaarNumber,
        aadhaarImageUrl: '',
        adminPhotoUrl: '',
        adminId: 'null',
        adminPassword: 'null',
        address: formData.address,
        paymentId: paymentResponse.razorpay_payment_id,
        paymentStatus: 'completed',
        registrationDate: new Date(),
        approvalStatus: 'pending',
        emailVerified: true,
        otp: otpState.generatedOtp,
        otpCreatedAt: new Date().toISOString()
      };

      const registrationId = await saveAdminRegistration(registrationData);

      // ✅ Send registration confirmation email
      await sendRegistrationEmail(formData.email, formData.fullName, registrationId);

      alert(`Registration successful! Registration ID: ${registrationId}`);
      setSubmitted(true);

      setTimeout(() => {
        navigate('/Login');
      }, 2000);

      (async () => {
        try {
          let aadhaarImageUrl = '';
          let applicantImageUrl = '';

          if (formData.aadhaarImage) {
            aadhaarImageUrl = await uploadFile(formData.aadhaarImage, 'aadhaar');
          }
          if (formData.applicantImage) {
            applicantImageUrl = await uploadFile(formData.applicantImage, 'admin-photos');
          }

          await saveAdminRegistration({
            ...registrationData,
            aadhaarImageUrl,
            adminPhotoUrl: applicantImageUrl
          });
        } catch (uploadErr) {
          console.warn('Image upload failed:', uploadErr);
        }
      })();
    } catch (err: any) {
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentInfo: any) => {
    try {
      ;

      // ✅ Send email to admin now
      await sendApplicationSuccessEmail(
        formData.fullName,
        formData.email,
        formData.address,
        formData.phoneNumber,
        formData.aadhaarNumber
      );

      console.log("✅ Email sent successfully");
      alert("Registration and payment successful. Confirmation email sent.");

    } catch (err) {
      console.error("❌ Payment success but email failed:", err);
      alert("Payment succeeded but email failed.");
    }



    if (!captchaVerified) {
      alert('Please verify reCAPTCHA');
      return;
    }

    if (!otpState.isOtpVerified || !mobileOtpState.isOtpVerified) {
      alert('Please verify both email and mobile OTPs');
      return;
    }

    // ✅ Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    if (!validateAadhaar(formData.aadhaarNumber)) {
      alert('Enter valid Aadhaar number');
      return;
    }

    if (!formData.aadhaarImage || !formData.applicantImage) {
      alert('Please upload Aadhaar and photo');
      return;
    }

    await handlePayment();
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <div className="text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Registration Submitted!</h2>
            <p className="text-gray-600 mt-2">
              You will receive your admin credentials after approval.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000 mt-6">
          <div className="text-center mb-8">
            <Link to="/Register" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                KissanHelper
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Registration</h2>
            <p className="text-slate-400">Apply for admin access - Manual approval required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Phone Number with OTP */}
              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    {!mobileOtpState.isOtpSent ? (
                      <button
                        type="button"
                        onClick={handleSendMobileOtp}
                        disabled={mobileOtpState.otpLoading}
                        className="text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
                      >
                        {mobileOtpState.otpLoading ? 'Sending...' : 'Send OTP'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendMobileOtp}
                        disabled={!mobileOtpState.canResend || mobileOtpState.otpLoading}
                        className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
                      >
                        {mobileOtpState.otpLoading ? (
                          'Sending...'
                        ) : mobileOtpState.canResend ? (
                          'Resend'
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            {mobileOtpState.otpTimer}s
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile OTP Input Section */}
                {mobileOtpState.isOtpSent && (
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">
                        OTP sent to {formData.phoneNumber}
                      </span>
                      {mobileOtpState.isOtpVerified && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={formData.mobileOtp}
                        onChange={(e) => handleInputChange('mobileOtp', e.target.value.replace(/\D/g, ''))}
                        className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={mobileOtpState.isOtpVerified}
                      />

                      {!mobileOtpState.isOtpVerified ? (
                        <button
                          type="button"
                          onClick={handleVerifyMobileOtp}
                          disabled={formData.mobileOtp?.length !== 6 || mobileOtpState.otpLoading}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                        >
                          {mobileOtpState.otpLoading ? 'Verifying...' : 'Verify'}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Email with OTP */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  {!otpState.isOtpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpState.otpLoading}
                      className="text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
                    >
                      {otpState.otpLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!otpState.canResend || otpState.otpLoading}
                      className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
                    >
                      {otpState.otpLoading ? (
                        'Sending...'
                      ) : otpState.canResend ? (
                        'Resend'
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          {otpState.otpTimer}s
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Input Section */}
              {otpState.isOtpSent && (
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      OTP sent to {formData.email}
                    </span>
                    {otpState.isOtpVerified && (
                      <Check className="w-4 h-4 text-green-400" />
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                      className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={otpState.isOtpVerified}
                    />

                    {!otpState.isOtpVerified ? (
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={formData.otp.length !== 6}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                      >
                        Verify
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-400 font-semibold">
                        <Check className="w-5 h-5" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <textarea
                required
                placeholder="Complete Address *"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Aadhaar Input */}
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Aadhaar Card Number (XXXX XXXX XXXX) *"
                value={formData.aadhaarNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
                  if (value.length <= 14) {
                    handleInputChange('aadhaarNumber', value);
                  }
                }}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Aadhaar and Photo Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aadhaar Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar Card Image *</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.aadhaar ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
                  onDragEnter={(e) => handleDrop(e, 'aadhaarImage')}
                  onDragLeave={(e) => handleDrop(e, 'aadhaarImage')}
                  onDragOver={(e) => handleDrop(e, 'aadhaarImage')}
                  onDrop={(e) => handleDrop(e, 'aadhaarImage')}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarImage', e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {formData.aadhaarImage ? (
                    <p className="text-emerald-400 text-sm font-medium">{formData.aadhaarImage.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Drop Aadhaar card here or click to upload</p>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Photo *</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.applicant ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-700/30'}`}
                  onDragEnter={(e) => handleDrop(e, 'applicantImage')}
                  onDragLeave={(e) => handleDrop(e, 'applicantImage')}
                  onDragOver={(e) => handleDrop(e, 'applicantImage')}
                  onDrop={(e) => handleDrop(e, 'applicantImage')}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('applicantImage', e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {formData.applicantImage ? (
                    <p className="text-emerald-400 text-sm font-medium">{formData.applicantImage.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Drop your photo here or click to upload</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="#" className="text-emerald-400 hover:text-emerald-300">Terms and Conditions</Link> and understand that this registration requires manual approval.
              </span>
            </div>

            {/* Notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Important Notice:</h4>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Your application will be manually reviewed</li>
                <li>• Admin credentials will be sent to your email after approval</li>
                <li>• Email and mobile verification with OTP is required</li>
                <li>• Payment is required to complete registration</li>
                <li>• If file upload fails, you can email documents manually</li>
              </ul>
            </div>
            <ReCAPTCHA
              sitekey="6Lepto4rAAAAAO53nO5sYRQH8x_awrbRC-DrKrLp"
              onChange={(token) => {
                console.log("reCAPTCHA token:", token); // ✅ Debug log
                setRecaptchaToken(token);
              }}
            />
            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : !otpState.isOtpVerified || !mobileOtpState.isOtpVerified ? (
                'Verify Email & Mobile First'
              ) : (
                'Register & Pay ₹499'
              )}
            </button>

            <div className="mt-8 text-center">
              <p className="text-slate-400">
                Already have login credentials?{' '}
                <Link to="/Login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;