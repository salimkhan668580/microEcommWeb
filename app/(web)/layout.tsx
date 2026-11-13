import WebLayout from "@/src/components/WebLayout/WebLayout"

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <WebLayout>
            {children}
        </WebLayout>
    )
}