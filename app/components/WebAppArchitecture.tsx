import React from 'react';

export default function WebAppArchitecture() {
    return (
        <svg viewBox="0 0 450 340" className="w-full h-auto drop-shadow-2xl" aria-hidden="true">
            <defs>
                {/* Gradients */}
                <linearGradient id="frontendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="backendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="dataGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                {/* Filters */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Frontend Layer */}
            <g>
                <rect x="30" y="20" width="100" height="45" rx="8" fill="url(#frontendGrad)" opacity="0.12" stroke="url(#frontendGrad)" strokeWidth="1.5" />
                <text x="80" y="35" fontSize="9" fill="#06b6d4" textAnchor="middle" fontWeight="700">FRONTEND</text>

                {/* Browser/Device icons */}
                <rect x="50" y="42" width="16" height="12" rx="2" fill="#06b6d4" opacity="0.3" />
                <rect x="72" y="42" width="16" height="12" rx="2" fill="#3b82f6" opacity="0.3" />
                <rect x="94" y="42" width="16" height="12" rx="2" fill="#0ea5e9" opacity="0.3" />

                <text x="80" y="62" fontSize="6" fill="#64748b" textAnchor="middle">React/Next.js</text>

                {/* Pulsing effect */}
                <circle cx="80" cy="42" r="20" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="20;35" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="2.5s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Backend/API Layer */}
            <g>
                <rect x="160" y="20" width="100" height="45" rx="8" fill="url(#backendGrad)" opacity="0.12" stroke="url(#backendGrad)" strokeWidth="1.5" />
                <text x="210" y="35" fontSize="9" fill="#10b981" textAnchor="middle" fontWeight="700">API GATEWAY</text>

                {/* API endpoints */}
                <circle cx="180" cy="48" r="5" fill="#10b981" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="210" cy="48" r="5" fill="#059669" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="240" cy="48" r="5" fill="#10b981" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>

                <text x="210" y="62" fontSize="6" fill="#64748b" textAnchor="middle">REST/GraphQL</text>
            </g>

            {/* Connection Frontend to Backend */}
            <path d="M130 42 L160 42" stroke="#06b6d4" strokeWidth="2" opacity="0.5" strokeDasharray="3,2">
                <animate attributeName="strokeDashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
            </path>

            {/* Data flow particle */}
            <circle r="3" fill="#06b6d4" filter="url(#softGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M130 42 L160 42" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* API Gateway to Backend */}
            <rect x="290" y="20" width="100" height="45" rx="8" fill="url(#backendGrad)" opacity="0.12" stroke="url(#backendGrad)" strokeWidth="1.5" />
            <text x="340" y="35" fontSize="9" fill="#10b981" textAnchor="middle" fontWeight="700">BACKEND</text>
            <text x="340" y="48" fontSize="6" fill="#64748b" textAnchor="middle">Node.js/Python</text>
            <rect x="315" y="52" width="50" height="3" rx="1.5" fill="#10b981" opacity="0.3" />
            <rect x="315" y="58" width="35" height="3" rx="1.5" fill="#059669" opacity="0.3" />

            {/* Connection API to Backend */}
            <path d="M260 42 L290 42" stroke="#10b981" strokeWidth="2" opacity="0.5" />

            {/* Microservices Layer */}
            <g>
                {/* Service 1 */}
                <rect x="30" y="95" width="85" height="50" rx="8" fill="url(#serviceGrad)" opacity="0.12" stroke="url(#serviceGrad)" strokeWidth="1.5" />
                <circle cx="50" cy="110" r="5" fill="#8b5cf6" opacity="0.4" />
                <circle cx="65" cy="110" r="5" fill="#6366f1" opacity="0.4" />
                <circle cx="80" cy="110" r="5" fill="#a78bfa" opacity="0.4" />
                <text x="72" y="128" fontSize="8" fill="#8b5cf6" textAnchor="middle" fontWeight="600">Auth Service</text>
                <text x="72" y="138" fontSize="6" fill="#64748b" textAnchor="middle">JWT / OAuth</text>

                {/* Service 2 */}
                <rect x="135" y="95" width="85" height="50" rx="8" fill="url(#serviceGrad)" opacity="0.12" stroke="url(#serviceGrad)" strokeWidth="1.5" />
                <circle cx="155" cy="110" r="5" fill="#8b5cf6" opacity="0.4" />
                <circle cx="170" cy="110" r="5" fill="#6366f1" opacity="0.4" />
                <circle cx="185" cy="110" r="5" fill="#a78bfa" opacity="0.4" />
                <text x="177" y="128" fontSize="8" fill="#8b5cf6" textAnchor="middle" fontWeight="600">Data Service</text>
                <text x="177" y="138" fontSize="6" fill="#64748b" textAnchor="middle">Business Logic</text>

                {/* Service 3 */}
                <rect x="240" y="95" width="85" height="50" rx="8" fill="url(#serviceGrad)" opacity="0.12" stroke="url(#serviceGrad)" strokeWidth="1.5" />
                <circle cx="260" cy="110" r="5" fill="#8b5cf6" opacity="0.4" />
                <circle cx="275" cy="110" r="5" fill="#6366f1" opacity="0.4" />
                <circle cx="290" cy="110" r="5" fill="#a78bfa" opacity="0.4" />
                <text x="282" y="128" fontSize="8" fill="#8b5cf6" textAnchor="middle" fontWeight="600">Event Service</text>
                <text x="282" y="138" fontSize="6" fill="#64748b" textAnchor="middle">Message Queue</text>

                {/* Pulse animations */}
                <circle cx="72" cy="110" r="4" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="8;18" dur="2s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="0s" />
                </circle>
                <circle cx="177" cy="110" r="4" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="8;18" dur="2s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <circle cx="282" cy="110" r="4" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="8;18" dur="2s" repeatCount="indefinite" begin="1.2s" />
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="1.2s" />
                </circle>
            </g>

            {/* Connections Backend to Services */}
            <path d="M210 65 L72 95" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            <path d="M225 65 L177 95" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            <path d="M240 65 L282 95" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />

            {/* Cloud Infrastructure Layer */}
            <g>
                <rect x="345" y="95" width="75" height="50" rx="8" fill="url(#cloudGrad)" opacity="0.12" stroke="url(#cloudGrad)" strokeWidth="1.5" />

                {/* Cloud icon representation */}
                <ellipse cx="382" cy="110" rx="15" ry="8" fill="#0ea5e9" opacity="0.3" />
                <ellipse cx="375" cy="115" rx="12" ry="7" fill="#38bdf8" opacity="0.3" />
                <ellipse cx="389" cy="115" rx="12" ry="7" fill="#0ea5e9" opacity="0.3" />

                <text x="382" y="133" fontSize="8" fill="#0ea5e9" textAnchor="middle" fontWeight="600">Cloud K8s</text>
                <text x="382" y="142" fontSize="6" fill="#64748b" textAnchor="middle">Auto-scaling</text>

                {/* Cloud pulse */}
                <circle cx="382" cy="112" r="15" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="15;25" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* AI Integration Layer */}
            <g>
                <rect x="30" y="175" width="100" height="55" rx="8" fill="url(#aiGrad)" opacity="0.12" stroke="url(#aiGrad)" strokeWidth="1.5" strokeDasharray="3,2" />

                {/* AI brain/neural network icon */}
                <circle cx="60" cy="195" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="60" cy="195" r="3" fill="#f59e0b" opacity="0.5" />
                <path d="M68 195 L85 195 M68 190 L85 200 M68 200 L85 190" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
                <circle cx="90" cy="195" r="8" fill="none" stroke="#fb923c" strokeWidth="1.5" />
                <circle cx="90" cy="195" r="3" fill="#fb923c" opacity="0.5" />

                <text x="80" y="215" fontSize="8" fill="#f59e0b" textAnchor="middle" fontWeight="600">AI / ML Layer</text>
                <text x="80" y="225" fontSize="6" fill="#78716c" textAnchor="middle">LLM • Embeddings</text>

                {/* AI processing pulse */}
                <circle cx="75" cy="195" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="12;22" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Vector Database for AI */}
            <rect x="160" y="175" width="80" height="55" rx="8" fill="url(#aiGrad)" opacity="0.1" stroke="url(#aiGrad)" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="200" y="195" fontSize="8" fill="#f59e0b" textAnchor="middle" fontWeight="600">Vector DB</text>
            <text x="200" y="205" fontSize="6" fill="#78716c" textAnchor="middle">Pinecone/Weaviate</text>
            <circle cx="190" cy="218" r="4" fill="#f59e0b" opacity="0.3" />
            <circle cx="200" cy="218" r="4" fill="#fb923c" opacity="0.3" />
            <circle cx="210" cy="218" r="4" fill="#f59e0b" opacity="0.3" />

            {/* Connection AI to Services */}
            <path d="M80 145 L80 175" stroke="#f59e0b" strokeWidth="1.5" opacity="0.3" strokeDasharray="3,2" />
            <path d="M177 145 L200 175" stroke="#f59e0b" strokeWidth="1.5" opacity="0.3" strokeDasharray="3,2" />

            {/* Data Layer - Primary Database */}
            <g>
                <ellipse cx="80" cy="268" rx="40" ry="18" fill="url(#dataGrad)" opacity="0.2" stroke="url(#dataGrad)" strokeWidth="1.5" />
                <ellipse cx="80" cy="268" rx="40" ry="18" fill="none" stroke="url(#dataGrad)" strokeWidth="1" transform="translate(0, -10)" />
                <path d="M40 268 L40 278 Q40 290 80 290 Q120 290 120 278 L120 268" fill="url(#dataGrad)" opacity="0.3" stroke="url(#dataGrad)" strokeWidth="1" />
                <text x="80" y="260" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="600">PostgreSQL</text>
                <text x="80" y="310" fontSize="6" fill="#64748b" textAnchor="middle">Primary Database</text>
            </g>

            {/* Cache Layer */}
            <g>
                <ellipse cx="210" cy="268" rx="40" ry="18" fill="url(#dataGrad)" opacity="0.2" stroke="url(#dataGrad)" strokeWidth="1.5" />
                <ellipse cx="210" cy="268" rx="40" ry="18" fill="none" stroke="url(#dataGrad)" strokeWidth="1" transform="translate(0, -10)" />
                <path d="M170 268 L170 278 Q170 290 210 290 Q250 290 250 278 L250 268" fill="url(#dataGrad)" opacity="0.3" stroke="url(#dataGrad)" strokeWidth="1" />
                <text x="210" y="260" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="600">Redis Cache</text>
                <text x="210" y="310" fontSize="6" fill="#64748b" textAnchor="middle">In-Memory Store</text>
            </g>

            {/* Object Storage */}
            <g>
                <rect x="290" y="250" width="70" height="55" rx="8" fill="url(#dataGrad)" opacity="0.12" stroke="url(#dataGrad)" strokeWidth="1.5" />
                <rect x="310" y="268" width="12" height="12" rx="2" fill="#10b981" opacity="0.3" />
                <rect x="325" y="268" width="12" height="12" rx="2" fill="#059669" opacity="0.3" />
                <rect x="310" y="283" width="12" height="12" rx="2" fill="#059669" opacity="0.3" />
                <rect x="325" y="283" width="12" height="12" rx="2" fill="#10b981" opacity="0.3" />
                <text x="325" y="265" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="600">S3 Storage</text>
                <text x="325" y="310" fontSize="6" fill="#64748b" textAnchor="middle">Object Store</text>
            </g>

            {/* Services to Databases */}
            <path d="M72 145 L80 250" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            <path d="M177 145 L210 250" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            <path d="M282 145 L325 250" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />

            {/* Data flow particles */}
            <circle r="2.5" fill="#10b981" filter="url(#softGlow)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M177 145 L210 250" />
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="2.5" fill="#8b5cf6" filter="url(#softGlow)">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M72 145 L80 250" begin="0.5s" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="0.5s" />
            </circle>
        </svg>
    );
}
