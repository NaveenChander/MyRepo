// This trim also includes a trim of inner consecutive characters, unlike
// the default trim which is called with string.trim(). ex: [a----b] => [a-b]
// where - represents ' '
export function trimAll(str: string): string
{
    try
    {
        const result = str.trim()
                    .replace(/\s+/g, ' ');
        return result;
    }
    catch
    {
        return '';
    }
}
