# Dot

> A Dat based CLI for sharing .dotfiles

## Usage

```bash
$ npm i -g @zigy/dot
$ dot --help
```

Stores a [hyperdrive](https://github.com/mafintosh/hyperdrive) in `${HOME}/.dotfile/drive` and mirrors actual files in
`${HOME}/.dotfiles`. When new files are added, `dot` will symlink the new file
from `${HOME}/.dotfiles` to the directory specified by `process.env.HOME`.

