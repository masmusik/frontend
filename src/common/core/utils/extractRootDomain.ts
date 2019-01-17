import { extractHostname } from './extractHostname';

export function extractRootDomain(url: string): string {
    let domain = extractHostname(url);
    const parts = domain.split('.');
    const arrLen = parts.length;

    // get root domain
    if (arrLen > 2) {
        domain = parts[arrLen - 2] + '.' + parts[arrLen - 1];
        console.log(domain);
        // see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (parts[arrLen - 2].length === 2 && parts[arrLen - 1].length === 2) {
            domain = parts[arrLen - 3] + '.' + domain;
        }
    }

    return domain;
}
