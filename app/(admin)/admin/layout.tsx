import AdminLayout from "@/src/components/AdminLayout/AdminLayout";


export default function Layout({
    children
}:{ children: React.ReactNode}){
    return(
<AdminLayout>

    {children}
</AdminLayout>
    
    )
}