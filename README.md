# Working with the repository

## pre-commit setup

we're using `pre-commit` for formatting. It needs to be installed or all commits will fail.

**One-Time Setup:**

1. **Install `pre-commit`:**

   - Either install `pre-commit` using pipx:

     ```bash
     pipx install pre-commit
     ```

   - Or you can also do it using pip it pipx doesn't work:

     ```bash
     pip install pre-commit
     ```

2. **Install Git Hooks:**
   And then also run this in the root of the repository:

   ```bash
   pre-commit install
   ```

   This will set up the pre-commit script to run automatically before each commit.

**Formatting Code:**

Before committing, you can manually format all relevant files by running:

```bash
make format
```

## docker & Makefile

we're going to use docker to host the database to make things easier.
i put some helpful Make commands in Makefile,
they have comments on how to use the different commands as well.

## directory structure

inside the /sql directory there is a /dev and /dev2 directory.
/dev will have files for option 1 of our database schema.
/dev2 will have files for option 2, this way we can test both.
please feel free to create more directories if you wanna test something else.

## bring up the database

after cloning the repo, do "make up", which should bring up the database,
so it can be accessed either using the command line
or some other dbms GUI tool like dbeaver.

## database saving etc

the database will only be hosted on everyone's own local docker volume,
so the only files that everyone will share together are the sql and other files.

## running & making new sql files

you can use the commands from the Makefile to run files from either of the
/dev directories to create the database schema or populate it etc.
we can then write our sql files in one of those directories and
run them to the database running in docker.
