import { parsePartialVersion } from './utils.js'

describe('utils', () => {
  describe('parseVersion', () => {
    it('should parse 0.0.4', () => {
      const version = parsePartialVersion('0.0.4')

      expect(version?.major).toBe(0)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(4)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.2.3', () => {
      const version = parsePartialVersion('1.2.3')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 10.20.30', () => {
      const version = parsePartialVersion('10.20.30')

      expect(version?.major).toBe(10)
      expect(version?.minor).toBe(20)
      expect(version?.patch).toBe(30)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.1.2-prerelease+meta', () => {
      const version = parsePartialVersion('1.1.2-prerelease+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse 1.1.2+meta', () => {
      const version = parsePartialVersion('1.1.2+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse 1.1.2+meta-valid', () => {
      const version = parsePartialVersion('1.1.2+meta-valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('meta-valid')
    })

    it('should parse 1.0.0-alpha', () => {
      const version = parsePartialVersion('1.0.0-alpha')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-beta', () => {
      const version = parsePartialVersion('1.0.0-beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha.beta', () => {
      const version = parsePartialVersion('1.0.0-alpha.beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha.beta.1', () => {
      const version = parsePartialVersion('1.0.0-alpha.beta.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.beta.1')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha.1', () => {
      const version = parsePartialVersion('1.0.0-alpha.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.1')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha0.valid', () => {
      const version = parsePartialVersion('1.0.0-alpha0.valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha0.valid')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha.0valid', () => {
      const version = parsePartialVersion('1.0.0-alpha.0valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.0valid')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay', () => {
      const version = parsePartialVersion(
        '1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay',
      )

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha-a.b-c-somethinglong')
      expect(version?.buildmeta).toBe('build.1-aef.1-its-okay')
    })

    it('should parse 1.0.0-rc.1+build.1', () => {
      const version = parsePartialVersion('1.0.0-rc.1+build.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('rc.1')
      expect(version?.buildmeta).toBe('build.1')
    })

    it('should parse 2.0.0-rc.1+build.123', () => {
      const version = parsePartialVersion('2.0.0-rc.1+build.123')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('rc.1')
      expect(version?.buildmeta).toBe('build.123')
    })

    it('should parse 1.2.3-beta', () => {
      const version = parsePartialVersion('1.2.3-beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 10.2.3-DEV-SNAPSHOT', () => {
      const version = parsePartialVersion('10.2.3-DEV-SNAPSHOT')

      expect(version?.major).toBe(10)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('DEV-SNAPSHOT')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.2.3-SNAPSHOT-123', () => {
      const version = parsePartialVersion('1.2.3-SNAPSHOT-123')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('SNAPSHOT-123')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0', () => {
      const version = parsePartialVersion('1.0.0')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 2.0.0', () => {
      const version = parsePartialVersion('2.0.0')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.1.7', () => {
      const version = parsePartialVersion('1.1.7')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(7)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 2.0.0+build.1848', () => {
      const version = parsePartialVersion('2.0.0+build.1848')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build.1848')
    })

    it('should parse 2.0.1-alpha.1227', () => {
      const version = parsePartialVersion('2.0.1-alpha.1227')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(1)
      expect(version?.prerelease).toBe('alpha.1227')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-alpha+beta', () => {
      const version = parsePartialVersion('1.0.0-alpha+beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha')
      expect(version?.buildmeta).toBe('beta')
    })

    it('should parse 1.2.3----RC-SNAPSHOT.12.9.1--.12+788', () => {
      const version = parsePartialVersion(
        '1.2.3----RC-SNAPSHOT.12.9.1--.12+788',
      )

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---RC-SNAPSHOT.12.9.1--.12')
      expect(version?.buildmeta).toBe('788')
    })

    it('should parse 1.2.3----R-S.12.9.1--.12+meta', () => {
      const version = parsePartialVersion('1.2.3----R-S.12.9.1--.12+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---R-S.12.9.1--.12')
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse 1.2.3----RC-SNAPSHOT.12.9.1--.12', () => {
      const version = parsePartialVersion('1.2.3----RC-SNAPSHOT.12.9.1--.12')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---RC-SNAPSHOT.12.9.1--.12')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0+0.build.1-rc.10000aaa-kk-0.1', () => {
      const version = parsePartialVersion('1.0.0+0.build.1-rc.10000aaa-kk-0.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('0.build.1-rc.10000aaa-kk-0.1')
    })

    it('should parse 999999999999999.99999999999999.9999999999999', () => {
      const version = parsePartialVersion(
        '999999999999999.99999999999999.9999999999999',
      )

      expect(version?.major).toBe(999999999999999)
      expect(version?.minor).toBe(99999999999999)
      expect(version?.patch).toBe(9999999999999)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1.0.0-0A.is.legal', () => {
      const version = parsePartialVersion('1.0.0-0A.is.legal')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('0A.is.legal')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse 1', () => {
      const version = parsePartialVersion('1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse 1.2', () => {
      const version = parsePartialVersion('1.2')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse 1-prerelease', () => {
      const version = parsePartialVersion('1-prerelease')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse 1+build', () => {
      const version = parsePartialVersion('1+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse 1-prerelease+build', () => {
      const version = parsePartialVersion('1-prerelease+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse 1.2-prerelease', () => {
      const version = parsePartialVersion('1.2-prerelease')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse 1.2+build', () => {
      const version = parsePartialVersion('1.2+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse 1.2-prerelease+build', () => {
      const version = parsePartialVersion('1.2-prerelease+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('build')
    })

    it('should parse v0.0.4', () => {
      const version = parsePartialVersion('v0.0.4')

      expect(version?.major).toBe(0)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(4)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.2.3', () => {
      const version = parsePartialVersion('v1.2.3')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v10.20.30', () => {
      const version = parsePartialVersion('v10.20.30')

      expect(version?.major).toBe(10)
      expect(version?.minor).toBe(20)
      expect(version?.patch).toBe(30)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.1.2-prerelease+meta', () => {
      const version = parsePartialVersion('v1.1.2-prerelease+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse v1.1.2+meta', () => {
      const version = parsePartialVersion('v1.1.2+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse v1.1.2+meta-valid', () => {
      const version = parsePartialVersion('v1.1.2+meta-valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(2)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('meta-valid')
    })

    it('should parse v1.0.0-alpha', () => {
      const version = parsePartialVersion('v1.0.0-alpha')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-beta', () => {
      const version = parsePartialVersion('v1.0.0-beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha.beta', () => {
      const version = parsePartialVersion('v1.0.0-alpha.beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha.beta.1', () => {
      const version = parsePartialVersion('v1.0.0-alpha.beta.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.beta.1')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha.1', () => {
      const version = parsePartialVersion('v1.0.0-alpha.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.1')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha0.valid', () => {
      const version = parsePartialVersion('v1.0.0-alpha0.valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha0.valid')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha.0valid', () => {
      const version = parsePartialVersion('v1.0.0-alpha.0valid')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha.0valid')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay', () => {
      const version = parsePartialVersion(
        'v1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay',
      )

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha-a.b-c-somethinglong')
      expect(version?.buildmeta).toBe('build.1-aef.1-its-okay')
    })

    it('should parse v1.0.0-rc.1+build.1', () => {
      const version = parsePartialVersion('v1.0.0-rc.1+build.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('rc.1')
      expect(version?.buildmeta).toBe('build.1')
    })

    it('should parse v2.0.0-rc.1+build.123', () => {
      const version = parsePartialVersion('v2.0.0-rc.1+build.123')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('rc.1')
      expect(version?.buildmeta).toBe('build.123')
    })

    it('should parse v1.2.3-beta', () => {
      const version = parsePartialVersion('v1.2.3-beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('beta')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v10.2.3-DEV-SNAPSHOT', () => {
      const version = parsePartialVersion('v10.2.3-DEV-SNAPSHOT')

      expect(version?.major).toBe(10)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('DEV-SNAPSHOT')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.2.3-SNAPSHOT-123', () => {
      const version = parsePartialVersion('v1.2.3-SNAPSHOT-123')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('SNAPSHOT-123')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0', () => {
      const version = parsePartialVersion('v1.0.0')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v2.0.0', () => {
      const version = parsePartialVersion('v2.0.0')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.1.7', () => {
      const version = parsePartialVersion('v1.1.7')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(1)
      expect(version?.patch).toBe(7)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v2.0.0+build.1848', () => {
      const version = parsePartialVersion('v2.0.0+build.1848')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build.1848')
    })

    it('should parse v2.0.1-alpha.1227', () => {
      const version = parsePartialVersion('v2.0.1-alpha.1227')

      expect(version?.major).toBe(2)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(1)
      expect(version?.prerelease).toBe('alpha.1227')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-alpha+beta', () => {
      const version = parsePartialVersion('v1.0.0-alpha+beta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('alpha')
      expect(version?.buildmeta).toBe('beta')
    })

    it('should parse v1.2.3----RC-SNAPSHOT.12.9.1--.12+788', () => {
      const version = parsePartialVersion(
        'v1.2.3----RC-SNAPSHOT.12.9.1--.12+788',
      )

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---RC-SNAPSHOT.12.9.1--.12')
      expect(version?.buildmeta).toBe('788')
    })

    it('should parse v1.2.3----R-S.12.9.1--.12+meta', () => {
      const version = parsePartialVersion('v1.2.3----R-S.12.9.1--.12+meta')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---R-S.12.9.1--.12')
      expect(version?.buildmeta).toBe('meta')
    })

    it('should parse v1.2.3----RC-SNAPSHOT.12.9.1--.12', () => {
      const version = parsePartialVersion('v1.2.3----RC-SNAPSHOT.12.9.1--.12')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBe(3)
      expect(version?.prerelease).toBe('---RC-SNAPSHOT.12.9.1--.12')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0+0.build.1-rc.10000aaa-kk-0.1', () => {
      const version = parsePartialVersion('v1.0.0+0.build.1-rc.10000aaa-kk-0.1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('0.build.1-rc.10000aaa-kk-0.1')
    })

    it('should parse v999999999999999.99999999999999.9999999999999', () => {
      const version = parsePartialVersion(
        'v999999999999999.99999999999999.9999999999999',
      )

      expect(version?.major).toBe(999999999999999)
      expect(version?.minor).toBe(99999999999999)
      expect(version?.patch).toBe(9999999999999)
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1.0.0-0A.is.legal', () => {
      const version = parsePartialVersion('v1.0.0-0A.is.legal')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(0)
      expect(version?.patch).toBe(0)
      expect(version?.prerelease).toBe('0A.is.legal')
      expect(version?.buildmeta).toBeUndefined()
    })

    it('should parse v1', () => {
      const version = parsePartialVersion('v1')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse v1.2', () => {
      const version = parsePartialVersion('v1.2')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse v1-prerelease', () => {
      const version = parsePartialVersion('v1-prerelease')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse v1+build', () => {
      const version = parsePartialVersion('v1+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse v1-prerelease+build', () => {
      const version = parsePartialVersion('v1-prerelease+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBeUndefined()
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse v1.2-prerelease', () => {
      const version = parsePartialVersion('v1.2-prerelease')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBeUndefined()
    })
    it('should parse v1.2+build', () => {
      const version = parsePartialVersion('v1.2+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBeUndefined()
      expect(version?.buildmeta).toBe('build')
    })
    it('should parse v1.2-prerelease+build', () => {
      const version = parsePartialVersion('v1.2-prerelease+build')

      expect(version?.major).toBe(1)
      expect(version?.minor).toBe(2)
      expect(version?.patch).toBeUndefined()
      expect(version?.prerelease).toBe('prerelease')
      expect(version?.buildmeta).toBe('build')
    })
  })
})
