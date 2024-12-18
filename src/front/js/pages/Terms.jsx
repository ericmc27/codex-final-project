import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">Terms and Conditions</h1>
                            <p className="text-muted mb-4">Last updated: March 2024</p>

                            <section className="mb-4">
                                <h4>1. Acceptance of Terms</h4>
                                <p>
                                    By accessing and using this legal consultation platform, you agree to be bound by these Terms and Conditions,
                                    our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms,
                                    you are prohibited from using or accessing this platform.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>2. User Registration</h4>
                                <p>
                                    2.1. To use our services, you must register for an account and provide accurate, complete, and current
                                    information.
                                </p>
                                <p>
                                    2.2. Lawyers must provide valid credentials and maintain current licensing information.
                                </p>
                                <p>
                                    2.3. Clients must provide accurate personal information for proper legal consultation.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>3. Service Description</h4>
                                <p>
                                    3.1. Our platform facilitates connections between lawyers and clients for legal consultation.
                                </p>
                                <p>
                                    3.2. We do not provide legal advice directly and are not responsible for the advice given by lawyers.
                                </p>
                                <p>
                                    3.3. Success of legal matters is not guaranteed and depends on various factors.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>4. User Responsibilities</h4>
                                <p>
                                    4.1. Users must maintain confidentiality of their account credentials.
                                </p>
                                <p>
                                    4.2. Users must not share false or misleading information.
                                </p>
                                <p>
                                    4.3. Users must comply with all applicable laws and professional codes of conduct.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>5. Privacy and Data Protection</h4>
                                <p>
                                    5.1. We collect and process personal data as described in our Privacy Policy.
                                </p>
                                <p>
                                    5.2. All communications between lawyers and clients are confidential.
                                </p>
                                <p>
                                    5.3. Users must respect privacy and confidentiality requirements.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>6. Payment Terms</h4>
                                <p>
                                    6.1. Fees for legal services are set by individual lawyers.
                                </p>
                                <p>
                                    6.2. Platform usage fees may apply as described in our pricing section.
                                </p>
                                <p>
                                    6.3. All payments are processed through secure third-party payment processors.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>7. Termination</h4>
                                <p>
                                    We reserve the right to terminate or suspend accounts for violations of these terms or for any other reason
                                    at our sole discretion.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>8. Disclaimer</h4>
                                <p>
                                    Our platform is provided "as is" without warranties of any kind, either express or implied.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h4>9. Contact Information</h4>
                                <p>
                                    For questions about these Terms and Conditions, please contact us at:
                                    <br />
                                    Email: support@legalconsult.com
                                    <br />
                                    Phone: (555) 123-4567
                                </p>
                            </section>

                            <div className="text-center mt-5">
                                <Link to="/signup" className="btn btn-primary">
                                    Return to Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms; 