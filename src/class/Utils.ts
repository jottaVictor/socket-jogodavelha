export default class Utils{
    public static gerarId(): string{
        return Math.random().toString(36).substring(2, 8) + Date.now().toString(36)
    }
}