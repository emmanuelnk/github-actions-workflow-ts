import { expressions, echoKeyValue, multilineString, workflowOps } from '..'

describe('expressions', () => {
  describe('expression', () => {
    it('should wrap the given expression in ${{ }}', () => {
      expect(expressions.expn('test.expression')).toBe('${{ test.expression }}')
    })
  })

  describe('env', () => {
    it('should wrap the given envName in ${{ env. }}', () => {
      expect(expressions.env('MY_ENV')).toBe('${{ env.MY_ENV }}')
    })
  })

  describe('secret', () => {
    it('should wrap the given secretName in ${{ secrets. }}', () => {
      expect(expressions.secret('MY_SECRET')).toBe('${{ secrets.MY_SECRET }}')
    })
  })

  describe('var', () => {
    it('should wrap the given varName in ${{ vars. }}', () => {
      expect(expressions.var('MY_VAR')).toBe('${{ vars.MY_VAR }}')
    })
  })

  describe('outputTernary', () => {
    it('should format the provided condition, ifTrue, and ifFalse values into a ternary expression', () => {
      expect(expressions.ternary('condition', 'trueValue', 'falseValue')).toBe(
        '${{ condition && trueValue || falseValue }}',
      )
    })
  })
})

describe('echoKeyValue', () => {
  describe('githubEnv', () => {
    it('should echo the given key and value to $GITHUB_ENV', () => {
      expect(echoKeyValue.toGithubEnv('key', 'value')).toBe(
        'echo "key=value" >> $GITHUB_ENV',
      )
    })
  })

  describe('githubOutput', () => {
    it('should echo the given key and value to $GITHUB_OUTPUT', () => {
      expect(echoKeyValue.toGithubOutput('key', 'value')).toBe(
        'echo "key=value" >> $GITHUB_OUTPUT',
      )
    })
  })

  describe('location', () => {
    it('should echo the given key and value to the specified location', () => {
      expect(echoKeyValue.to('key', 'value', '/path/to/location')).toBe(
        'echo "key=value" >> /path/to/location',
      )
    })
  })
})

describe('multilineString', () => {
  it('should join the given strings with newline characters', () => {
    expect(multilineString('line1', 'line2', 'line3')).toBe(
      'line1\nline2\nline3',
    )
  })

  it('escapes backspace characters', () => {
    const input = '\b'
    const expected = '\\b'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes form feed characters', () => {
    const input = '\f'
    const expected = '\\f'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes newline characters', () => {
    const input = '\n'
    const expected = '\\n'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes carriage return characters', () => {
    const input = '\r'
    const expected = '\\r'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes tab characters', () => {
    const input = '\t'
    const expected = '\\t'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes vertical tab characters', () => {
    const input = '\v'
    const expected = '\\v'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes null characters', () => {
    const input = '\0'
    const expected = '\\0'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes backslash characters', () => {
    const input = '\\'
    const expected = '\\\\'
    expect(multilineString(input)).toBe(expected)
  })

  it('escapes multiple escape sequences', () => {
    const input = '\b\f\n\r\t\v\0\\'
    const expected = '\\b\\f\\n\\r\\t\\v\\0\\\\'
    expect(multilineString(input)).toBe(expected)
  })

  it('returns the original string if there are no characters to escape', () => {
    const input = 'Hello World!'
    expect(multilineString(input)).toBe(input)
  })

  it('handles multiple strings', () => {
    const inputs = ['Hello', 'World\n', '\\Hello\\']
    const expected = 'Hello\nWorld\\n\n\\\\Hello\\\\'
    expect(multilineString(...inputs)).toBe(expected)
  })

  it('handles empty strings', () => {
    const input = ''
    expect(multilineString(input)).toBe('')
  })
})

describe('outputTernary', () => {
  it('should format the provided condition, ifTrue, and ifFalse values into a ternary expression', () => {
    expect(workflowOps.ternary('condition', 'trueValue', 'falseValue')).toBe(
      '${{ condition && trueValue || falseValue }}',
    )
  })
})
