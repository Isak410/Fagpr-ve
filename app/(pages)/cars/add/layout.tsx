export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-100 items-center h-full w-full flex justify-center">
            {children}
        </div>
    );
}
