import type { Project } from '@/app/types/project'


export const PROJECTS: Project[] = [
    {
        id: 'p1',
        title: 'Smart CRM',
        description: 'Manage your contacts with tags, categories, and status tracking.',
        demoUrl: 'https://alpha.allpilar.com',
        imgA: { src: '/micro1.png', alt: 'Smart CRM screenshot 1', blurDataURL: '' },
        imgB: { src: '/micro2.png', alt: 'Smart CRM screenshot 2', blurDataURL: '' }
    },
    {
        id: 'p2',
        title: 'Modern Resume Builder',
        description: 'A Rich, professional resume builder application built with Next.js and modern web technologies.',
        demoUrl: 'https://beta.allpilar.com',
        imgA: { src: '/res1.png', alt: 'Resume Builder screenshot 1', blurDataURL: '' },
        imgB: { src: '/res2.png', alt: 'Resume Builder screenshot 2', blurDataURL: '' }
    },
    {
        id: 'p3',
        title: 'Ecommerce Online',
        description: 'A modern e-commerce scaffold designed for a computer accessories store.',
        demoUrl: 'https://alpha.allpilar.com',
        imgA: { src: '/ecom1.png', alt: 'Ecommerce screenshot 1', blurDataURL: '' },
        imgB: { src: '/ecom2.png', alt: 'Ecommerce screenshot 2', blurDataURL: '' }
    },
    {
        id: 'p4',
        title: 'Church Management & Payment Platform',
        description: 'A robust management system for churches featurin hierarchical User roles, secure payment processing, and real-time updates.',
        demoUrl: 'https://beta.allpilar.com',
        imgA: { src: '/micro1.png', alt: 'Church Management screenshot 1', blurDataURL: '' },
        imgB: { src: '/micro2.png', alt: 'Church Management screenshot 2', blurDataURL: '' }
    }
]