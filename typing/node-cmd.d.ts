declare module 'node-cmd' {
    function run(command: string, callback: (err: any, data: string) => void): void;
}