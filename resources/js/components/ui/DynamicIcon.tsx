import * as LucideIcons from "lucide-react";
import { Package, LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
    name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as
        | React.ComponentType<LucideProps>
        | undefined;
    return Icon ? <Icon {...props} /> : <Package {...props} />;
};
