"use client";

import { useState, useEffect } from "react";
import { Monitor, Smartphone, Lock, UserX, SettingsIcon, AlertCircle, Trash2, Info, PauseCircle, Check, X } from 'lucide-react';
import {
  updatePasswordService,
  updateDisableStatusService,
  updateDeleteStatusService,
  sendVerificationCodeService,
  verifyCodeService,
  sendOTP,
  verifyOTP,
  checkEmailVerificationStatusService,
  checkPhoneVerificationStatusService,
} from "../../../services/userServices";
import {
  getConnectedBrowsersService,
  disconnectSessionService,
} from "../../../services/sessionServices";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SettingsPage() {
  const router = useRouter();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showAllSessions, setShowAllSessions] = useState(false);


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // const [language, setLanguage] = useState('nl');
  // const [timezone, setTimezone] = useState('Europe/Amsterdam');
  // const [contactPreference, setContactPreference] = useState('email');
  // const [profileVisibility, setProfileVisibility] = useState('all');
  // const [projectNotifications, setProjectNotifications] = useState(true);
  // const [messageNotifications, setMessageNotifications] = useState(true);
  // const [reviewNotifications, setReviewNotifications] = useState(true);
  // const [communicationPreferences, setCommunicationPreferences] = useState({
  //   email: true,
  //   phone: false,
  //   app: true
  // });

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updatePasswordService({ currentPassword, newPassword });
      setSuccess("Password updated successfully!");
      setShowChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.message === "The current password is incorrect. Please try again.") {
        setError("The current password is incorrect. Please check and try again.");
      } else {
        setError(err.response?.data?.message || "An error occurred while updating the password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisableAccount = async () => {
    try {
      await updateDisableStatusService();
      Cookies.remove("token");
      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setShowDisableConfirm(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await updateDeleteStatusService(true);
      Cookies.remove("token");
      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleSendEmailVerificationCode = async () => {
    try {
      setIsSubmitting(true);
      setMessage("");
      setError("");
      await sendVerificationCodeService();
      setMessage("Verification code sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailVerificationCode = async () => {
    try {
      setIsSubmitting(true);
      setMessage("");
      setError("");
      await verifyCodeService(verificationCode);
      setMessage("Email verified successfully!");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchConnectedBrowsers = async () => {
    try {
      setLoading(true);
      const fetchedSessions = await getConnectedBrowsersService();
      setSessions(fetchedSessions.sessions);
    } catch (error) {
      console.log("Error fetching connected browsers:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVerificationStatuses = async () => {
    try {
      const phoneStatus = await checkPhoneVerificationStatusService();
      setPhoneVerified(phoneStatus === "Phone is verified");
      
      const emailStatus = await checkEmailVerificationStatusService();
      setEmailVerified(emailStatus === "Email is verified");
    } catch (error) {
      console.error("Error fetching verification statuses:", error.message);
    }
  };

  const disconnectSession = async (sessionId) => {
    try {
      const result = await disconnectSessionService(sessionId);
      console.log(result.message);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendPhoneVerificationCode = async () => {
    setLoading(true);
    setMessage("");
    try {
      const responseMessage = await sendOTP(phoneNumber);
      setMessage(responseMessage);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneVerificationCode = async () => {
    setLoading(true);
    setMessage("");
    try {
      const responseMessage = await verifyOTP(phoneNumber, verificationCode);
      setMessage(responseMessage);
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedBrowsers();
    fetchVerificationStatuses();
  }, []);

  const menuItems = [
    { id: 'security', icon: <Lock className="w-4 h-4" />, label: 'Beveiliging' },
    { id: 'devices', icon: <Monitor className="w-4 h-4" />, label: 'Apparaten' },
    { id: 'account', icon: <UserX className="w-4 h-4" />, label: 'Account Beheer' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#27aae2] via-[#1a8dbb] to-[#27aae2]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#27aae2]/50 to-[#27aae2]"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
              Instellingen
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Beheer je ProConnect profiel, voorkeuren en beveiligingsinstellingen
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <SettingsIcon className="w-5 h-5 text-[#27aae2]" />
                Menu
              </h3>
              <nav className="space-y-1">
                {menuItems.map((menuItem) => (
                  <a key={menuItem.id} href={`#${menuItem.id}`} className="flex items-center gap-2 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    {menuItem.icon}
                    {menuItem.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column - Settings Sections */}
          <div className="flex-1 space-y-6">
            {/* Security Section */}
            <section id="security" className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-[#27aae2]" />
                Beveiliging
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-b pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">Wachtwoord wijzigen</h3>
                      <p className="text-sm text-gray-600">Wijzig je wachtwoord om je account veilig te houden</p>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      Wijzigen
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-4">Tweestapsverificatie (2FA)</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Beveilig je account met een extra verificatiestap bij het inloggen.</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {emailVerified ? "E-mail verificatie ingeschakeld" : "E-mail verificatie uitgeschakeld"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEmailVerification(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      {emailVerified ? "Wijzigen" : "Instellen"}
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">Telefoonverificatie</h3>
                      <p className="text-sm text-gray-600">Voeg een extra beveiligingslaag toe met telefoonverificatie.</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {phoneVerified ? "Telefoon geverifieerd" : "Telefoon niet geverifieerd"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPhoneVerification(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      {phoneVerified ? "Wijzigen" : "Verifiëren"}
                    </button>
                  </div>
                </div>
              </div>
            </section>


            {/* Connected Browsers */}
            <section id="devices" className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <Monitor className="w-6 h-6 sm:w-7 sm:h-7 text-[#27aae2]" />
                Verbonden Apparaten
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <>
                    {sessions && sessions.length > 0 ? (
                      <div className="space-y-4">
                        {sessions.slice(0, showAllSessions ? sessions.length : 6).map((session, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 sm:gap-4"
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              {session.deviceName?.toLowerCase().includes("pc") ? (
                                <Monitor className="h-5 w-5 text-gray-500" />
                              ) : (
                                <Smartphone className="h-5 w-5 text-gray-500" />
                              )}
                              <div>
                                <p className="font-medium text-sm sm:text-base">
                                  {session.deviceName || "Unknown Device"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  {session.browser || "Unknown Browser"}
                                </p>
                              </div>
                            </div>
                            <button
                              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:text-base"
                              onClick={() => disconnectSession(session._id)}
                            >
                              Uitloggen
                            </button>
                          </div>
                        ))}
                        {sessions.length > 6 && (
                          <button
                            className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
                            onClick={() => setShowAllSessions(true)}
                          >
                            Bekijk alles
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base">Geen verbonden apparaten gevonden.</p>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* Account Management */}
            <section id="account" className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <UserX className="w-6 h-6 sm:w-7 sm:h-7 text-[#27aae2]" />
                Account Beheer
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Account Status Info */}
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-4 text-blue-700 mb-3">
                    <Info className="w-6 h-6 sm:w-5 sm:h-5" />
                    <h3 className="text-base sm:text-lg font-medium text-center sm:text-left">Account Status</h3>
                  </div>
                  <p className="text-blue-600 text-sm sm:text-base text-center sm:text-left">
                    Je account is momenteel actief. Hieronder kun je je account beheren.
                  </p>
                </div>


                {/* Tijdelijk Deactiveren */}
                <div className="border rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <PauseCircle className="w-5 h-5 text-yellow-500" />
                        <h3 className="text-base sm:text-lg font-medium">Tijdelijk Deactiveren</h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Deactiveer tijdelijk je account wanneer je een pauze wilt nemen van ProConnect.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Je profiel wordt verborgen voor andere gebruikers
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Al je gegevens blijven bewaard
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Je kunt op elk moment weer activeren
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDisableConfirm(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm sm:text-base"
                    >
                      Deactiveren
                    </button>
                  </div>
                </div>

                {/* Permanent Verwijderen */}
                <div className="border rounded-lg p-4 sm:p-6 border-red-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Trash2 className="w-5 h-5 text-red-500" />
                        <h3 className="text-base sm:text-lg font-medium">Permanent Verwijderen</h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Verwijder je account en alle bijbehorende gegevens permanent van ProConnect.
                        </p>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-red-800 mb-2">Let op: Dit houdt in dat</h4>
                          <ul className="text-sm text-red-700 space-y-2">
                            <li className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Al je persoonlijke gegevens worden verwijderd
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Je projectgeschiedenis wordt gewist
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Deze actie kan niet ongedaan worden gemaakt
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm sm:text-base"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Modals */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#27aae2]" />
                <h3 className="text-lg sm:text-xl font-semibold">Wachtwoord Wijzigen</h3>
              </div>
              <button
                onClick={() => setShowChangePassword(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Huidig wachtwoord
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#27aae2] focus:border-[#27aae2]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nieuw wachtwoord
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#27aae2] focus:border-[#27aae2]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bevestig nieuw wachtwoord
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#27aae2] focus:border-[#27aae2]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                Annuleren
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-[#27aae2] text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
              >
                Wachtwoord Wijzigen
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">E-mail Verificatie</h3>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
                onClick={handleSendEmailVerificationCode}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verzenden..." : "Verstuur Verificatiecode"}
              </button>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                placeholder="Voer verificatiecode in"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm sm:text-base"
                onClick={handleVerifyEmailVerificationCode}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifiëren..." : "Verifieer Code"}
              </button>
              {message && <p className="text-green-500 text-sm">{message}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                className="w-full px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-sm sm:text-base"
                onClick={() => setShowEmailVerification(false)}
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Telefoon Verificatie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                  placeholder="Voer je telefoonnummer in"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verificatiecode
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                  placeholder="Voer 6-cijferige code in"
                />
              </div>
              <div className="text-sm text-gray-500">{message}</div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm sm:text-base"
                  onClick={() => setShowPhoneVerification(false)}
                >
                  Annuleren
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
                  onClick={handleSendPhoneVerificationCode}
                  disabled={loading}
                >
                  {loading ? "Verzenden..." : "Verstuur Code"}
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm sm:text-base"
                  onClick={handleVerifyPhoneVerificationCode}
                  disabled={loading}
                >
                  {loading ? "Verifiëren..." : "Verifieer Code"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disable Confirmation Modal */}
      {showDisableConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Account Deactiveren</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Weet je zeker dat je je account wilt deactiveren? Alle activiteiten op dit account zullen worden beperkt.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm sm:text-base"
                onClick={() => setShowDisableConfirm(false)}
              >
                Annuleren
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm sm:text-base"
                onClick={handleDisableAccount}
              >
                Bevestigen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Account Verwijderen</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Weet je zeker dat je je account permanent wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm sm:text-base"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuleren
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:text-base"
                onClick={handleDeleteAccount}
              >
                Permanent Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}