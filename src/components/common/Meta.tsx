import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaProps {
    title: string;
    description?: string;
}

const Meta: FC<MetaProps> = ({ title, description }) => {
    const location = useLocation();

    useEffect(() => {
        const fullTitle = `${title} | EXCI-MAA`;
        document.title = fullTitle;

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = description;
                document.head.appendChild(meta);
            }
        }
    }, [title, description, location]);

    return null;
};

export default Meta;
