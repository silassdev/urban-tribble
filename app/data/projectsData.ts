import type { Project } from '@/app/types/project'


export const PROJECTS: Project[] = [
    {
        id: 'p1',
        title: 'Project Alpha',
        description: 'A performant commerce frontend with SSR and edge caching.',
        demoUrl: 'https://alpha.allpilar.com',
        imgA: { src: '/assets/alpha-1.jpg', alt: 'Alpha screenshot 1', blurDataURL: '' },
        imgB: { src: '/assets/alpha-2.jpg', alt: 'Alpha screenshot 2', blurDataURL: '' }
    },
    {
        id: 'p2',
        title: 'Project Beta',
        description: 'Admin dashboard with role-based access and realtime updates.',
        demoUrl: 'https://beta.allpilar.com',
        imgA: { src: '/assets/beta-1.jpg', alt: 'Beta screenshot 1', blurDataURL: '' },
        imgB: { src: '/assets/beta-2.jpg', alt: 'Beta screenshot 2', blurDataURL: '' }
    }
]