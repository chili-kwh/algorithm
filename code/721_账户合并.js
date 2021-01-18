/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
    const n = accounts.length;
    if (n <= 1) return accounts;

    let accountMap = {}
    let roots = Array.from(new Array(n), (e, i) => i)
    let results = new Array(n)

    function find(n) {
        return roots[n] === n ? n : roots[n] = find(roots[n])
    }

    function union(a, b) {
        roots[find(a)] = find(b)
    }

    for ([idx, [name, ...emails]] of accounts.entries()) {
        for (em of emails) {
            if (accountMap[em] === undefined) {
                accountMap[em] = idx
            } else {
                union(accountMap[em], idx)
            }
        }
    }

    function mergeAccount(root, idx) {

        if (!results[root]) {
            return [...new Set(accounts[idx])].sort()
        }

        const [name, ...emailA] = results[root]
        const [_, ...emailB] = accounts[idx]
        const email = [...new Set([...emailA, ...emailB])].sort()
        return [name, ...email]
    }

    for ([idx, rt] of roots.entries()) {
        const root = find(idx)
        results[root] = mergeAccount(root, idx)
    }

    return results.filter(e => !!e)
};

const acc = [["Alex", "Alex5@m.co", "Alex4@m.co", "Alex0@m.co"], ["Ethan", "Ethan3@m.co", "Ethan3@m.co", "Ethan0@m.co"], ["Kevin", "Kevin4@m.co", "Kevin2@m.co", "Kevin2@m.co"], ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe2@m.co"], ["Gabe", "Gabe3@m.co", "Gabe4@m.co", "Gabe2@m.co"]]
console.log(accountsMerge(acc))